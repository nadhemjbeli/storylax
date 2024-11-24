import api from "../../utils/api.ts";
import {ICitySchema} from "../city.data.ts";

export interface IExplorePlaceSchema{
    _id?: string;
    description: string;
    image: string;
    motivationalSentence: string;
    city: ICitySchema;
    createdAt?:Date;
}


const getExplorePlacesData = async ()=>{
    return await api.get('/explore-places')
}
const showExplorePlaceData = async (id:string)=>{
    return await api.get(`/explore-places/${id}`)
}
const getExplorePlaceEventsData = async (city:string)=>{
    return await api.get('/explore-place-events/by-city/'+city)
}

export {
    getExplorePlacesData,
    showExplorePlaceData,
    getExplorePlaceEventsData,
}