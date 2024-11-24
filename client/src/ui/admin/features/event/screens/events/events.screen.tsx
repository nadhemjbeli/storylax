// src/ui/admin/features/event/screens/events/event.screen.tsx

import React, { useEffect, useState } from 'react';
import EventTable from '../../components/events-table/events-table.component.tsx';
import './events.style.scss';
import { getEvents, IEvent } from '../../../../../../data/explore/events.data.ts';
import { Link } from 'react-router-dom';
import api from '../../../../../../utils/api.ts';

const AdminEvents: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getEvents().then((data) => {
            setEvents(data.data);
        });
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`events/${id}`).then(() => {
            setEvents(events.filter(event => event._id !== id));
        });
    };

    return (
        <div className="admin-events-page">
            <div className={"title-wrapper"}>
                <h2>Manage Events</h2>
                <div className="buttons-wrapper">
                    <Link to={"/admin/add-event"}>
                        <button className="primary-button">Add an Event</button>
                    </Link>
                </div>
            </div>
            <EventTable events={events} onDelete={handleDelete} />
        </div>
    );
};

export default AdminEvents;
