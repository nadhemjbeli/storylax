// src/models/event/event-cards/event-cards.mongo.ts

import { Card } from './event-cards.model';

export const getCardsByEventIdFromDB = async (eventId: string) => {
    return await Card.find({ event: eventId });
};

export const createCardInDB = async (cardData: { event: string, name:string, image: string }) => {
    const card = new Card(cardData);
    return await card.save();
};

export const deleteCardFromDB = async (cardId: string) => {
    return await Card.findByIdAndDelete(cardId);
};
