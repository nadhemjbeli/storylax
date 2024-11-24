// src/ui/admin/features/event/screens/event-cards/event-cards.screen.tsx

import React, { useEffect, useState } from 'react';
import EventCardsTable from '../../components/event-cards-table/event-cards-table.component.tsx';
import './event-cards.style.scss';
import { getEventCardsByEvent, IEventCard } from '../../../../../../data/explore/events.data.ts';
import {Link, useParams} from 'react-router-dom';
import api from '../../../../../../utils/api.ts';

const AdminEventCards: React.FC = () => {
    const {eventId}=useParams()
    const [eventCards, setEventCards] = useState<IEventCard[]>([]);

    useEffect(() => {
        // Assuming you fetch event cards directly
        eventId?getEventCardsByEvent(eventId).then((data) => {
            setEventCards(data.data); // Set event cards instead of events
        }):setEventCards([]);
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`event-cards/${id}`).then(() => {
            setEventCards(eventCards.filter(card => card._id !== id)); // Filter out by event card's event ID
        });
    };

    return (
        <div className="admin-event-cards-page">
            <div className={"title-wrapper"}>
                <h2>Manage Event Cards</h2>
                <div className="buttons-wrapper">
                    <Link to={`/admin/add-event-card/${eventId}`}>
                        <button className="primary-button">Add an Event Card</button>
                    </Link>
                </div>
            </div>
            <EventCardsTable eventCards={eventCards} onDelete={handleDelete} />
        </div>
    );
};

export default AdminEventCards;
