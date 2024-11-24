// src/data/explore/events.data.ts
import api from "../../utils/api.ts";
import {ICitySchema} from "../city.data.ts";


export interface IEvent {
    _id?: string;
    city: ICitySchema;
    title: string;
    resume: string;
    description: string;
    startDate: string;
    endDate: string;
    author?: any;
    principalImage?:any;
    createdAt?: string;
    updatedAt?: string;

}
export interface IAddEvent {
    _id?: string;
    city: any;
    title: string;
    resume: string;
    defaultImage: string;
    smallImage: string;
    mediumImage: string;
    largeImage: string;
    description: string;
    startDate: string;
    endDate: string;

}

export interface IEventCard{
    _id?: string;
    event: IEvent;
    name: string;
    image: string;
    flipped?: boolean;
    matched?: boolean;
}
export interface IAddEventCard{
    event: string;
    name: string;
    image: string;
}




const getEvents = async ()=>{
    return await api.get('/events')
}
const getEventCardsByEvent = async (eventId:string)=>{
    return await api.get('/event-cards/' + eventId)
}
const getEventsStartDateSorted = async ()=>{
    return await api.get('/events/sorted-start-date')
}

const showEventData = async (id:string)=>{
    return await api.get(`/events/${id}`)
}

const getTopScoresByEvent = async (eventId: string) => {
    return await api.get(`/scores/event/${eventId}`);
};

const saveEventScore = async (eventId: string, score: number) => {
    return await api.post(`/scores`, { score, event:eventId });
};

export {
    getEvents,
    getEventCardsByEvent,
    getEventsStartDateSorted,
    getTopScoresByEvent,
    showEventData,
    saveEventScore // Export the new method
};
