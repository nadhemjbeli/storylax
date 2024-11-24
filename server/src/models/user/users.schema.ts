
// src/models/user/users.schema.ts

// Type for creating a user, without autogenerated fields
interface IUserSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    provider?:string;
    hostSpecificField?:string;
    role?: 'admin' | 'traveler' | 'host';
    phoneNumber?: string;
    bio?: string;
    image?: string,
    city?: string,
    address?: string,
    postalCode?: string,
    interests?: string[],
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IUserTokenSchema{
    user:{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        provider?:string;
        hostSpecificField?:string;
        role?: 'admin' | 'traveler' | 'host';
        image?: string;
        phoneNumber?: string;
        bio?: string;
        createdAt?: Date;
        resetPasswordToken?: string;
        resetPasswordExpires?: number;
        updatedAt?: Date;
        city?: string,
        address?: string,
        postalCode?: string,
        interests?: string[],
    };
    token: string;
}

export {
    IUserSchema,
    IUserTokenSchema
}