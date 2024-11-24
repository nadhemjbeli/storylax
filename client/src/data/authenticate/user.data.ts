import api from "../../utils/api.ts";

export interface IUserData {
    _id?:string;
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
    createdAt?: Date;
    updatedAt?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
}

export interface IUserInterest{
    _id?: string;
    users?: any[];
    name:string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IUserInterestsData{
    _id?: string;
    interests?: any[];
}


const getUsersData = async ()=>{
    return await api.get('/users')
}
const getUserInterestsData = async ()=>{
    return await api.get('/user-interests')
}
const showUserData = async (id:string)=>{
    return await api.get(`/users/${id}`)
}
const showInterestData = async (id:string)=>{
    return await api.get(`/user-interests/${id}`)
}

export {
    getUsersData,
    showUserData,
    getUserInterestsData,
    showInterestData
}