export default interface IUserSchema {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    hostSpecificField?: string;
    role?: 'admin' | 'traveler' | 'host';
    profilePicture?: string;
    phoneNumber?: string;
    bio?: string;
    createdAt?: Date;
}