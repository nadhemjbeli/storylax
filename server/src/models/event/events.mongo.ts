// src/models/event/events.mongo.ts
import { ExploreEvent, IEvent } from './events.model';
import {authenticateUserByRole} from "../../middleware/auth";

export const getEventsFromDB = async () => {
    return await ExploreEvent.find().populate('city');
};

export const getEventsSortedByStartDateFromDB = async () => {
    return await ExploreEvent.find().populate('city').sort({startDate: 1});
};

export const getEventByIdFromDB = async (id: string) => {
    return await ExploreEvent.findById(id).populate('city').populate('author');
};

export const createEventInDB = async (eventData: Partial<IEvent>) => {
    const event = new ExploreEvent(eventData);
    return await event.save();
};

export const updateEventInDB = async (id: string, eventData: Partial<IEvent>) => {
    return await ExploreEvent.findByIdAndUpdate(id, eventData, { new: true });
};

export const deleteEventFromDB = async (id: string) => {
    return await ExploreEvent.findByIdAndDelete(id);
};


