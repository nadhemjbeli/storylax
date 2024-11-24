// src/models/explore-place-event/explore-place-events.mongo.ts
import {ExplorePlaceEvent, IExploreEvent} from './explore-place-events.model';
import {ExplorePlace} from "../explore-place/explore-places.model";

export const getEventsFromDB = async () => {
    return await ExplorePlaceEvent.find().populate('explorePlace');
};
export const getEventsByCityFromDB = async (cityId:string) => {
    try {
        // Find places in the given city
        const places = await ExplorePlace.find({ city: cityId }).exec();
        const placeIds = places.map(place => place._id);

        // Find events for the found places
        const events = await ExplorePlaceEvent.find({ explorePlace: { $in: placeIds } }).populate('explorePlace').exec();

        return events;
    } catch (error) {
        console.error(`Failed to get events for city ${cityId}:`, error);
        throw error;
    }
};

export const getEventByIdFromDB = async (id: string) => {
    return await ExplorePlaceEvent.findById(id).populate('explorePlace');
};

export const createEventInDB = async (eventData: Partial<IExploreEvent>) => {
    const event = new ExplorePlaceEvent(eventData);
    return await event.save();
};

export const updateEventInDB = async (id: string, eventData: Partial<IExploreEvent>) => {
    return await ExplorePlaceEvent.findByIdAndUpdate(id, eventData, { new: true });
};

export const deleteEventFromDB = async (id: string) => {
    return await ExplorePlaceEvent.findByIdAndDelete(id);
};
