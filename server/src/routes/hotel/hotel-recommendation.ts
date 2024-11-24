import { User, IUser } from '../../models/user/users.model';
import { Hotel, IHotel } from '../../models/hotel/hotels.model';
import { UserInterest } from '../../models/user-interest/user-interests.model';
import { HotelService } from "../../models/hotel/hotel-service/hotel-services.model";

export const recommendHotelsByKNN = async (userId: string) => {
    try {
        // Fetch user with interests
        const user = await User.findById(userId).populate('interests');
        if (!user) throw new Error('User not found');

        // Fetch all hotels
        const hotels = await Hotel.find(); // Assuming 'services' is a populated field

        // Get the user's interests
        const userInterests = await Promise.all(
            user.interests.map(interest => UserInterest.findById(interest))
        );

        const userInterestNames = userInterests
            .filter(interest => interest !== null) // Filter out any null interests
            .map(interest => interest?.name);

        // Calculate similarity between user and hotels
        const recommendedHotels = await Promise.all(hotels.map(async hotel => {
            let similarityScore = 0;
            const hotelServices = await HotelService.find({ hotel: hotel._id });

            hotelServices.forEach(service => {
                if (userInterestNames.includes(service.name)) {
                    similarityScore += 1;
                }
            });

            return { hotel, score: similarityScore };  // Returning hotel and similarity score
        }));

        // Sort hotels by score in descending order and return
        return recommendedHotels.sort((a, b) => b.score - a.score);
    } catch (error) {
        throw new Error('Error recommending hotels: ' + (error as any).message);
    }
};
