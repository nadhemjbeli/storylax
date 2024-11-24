// src/data/traveler/interests.data.ts
import api from "../../utils/api.ts";
export interface IUserInterestData{
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
const getCurrentUserInterests = async ()=>{
    return await api.get(`/user-interests/current/multiple`)
}

export {
    getCurrentUserInterests
}