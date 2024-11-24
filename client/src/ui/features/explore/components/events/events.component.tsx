import React, {useEffect, useState} from 'react';
import "./events.style.scss";
import Calendar from "./calendar/calendar.component.tsx";
import ListEvents from "./list-events/list-events.component.tsx";
import {getEvents, getEventsStartDateSorted, IEvent} from "../../../../../data/explore/events.data.ts";

interface EventsProps {
    explorePlaceId: string;
}

const Events: React.FC<EventsProps> = ({ explorePlaceId }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [someEvents, setSomeEvents] = useState<IEvent[]>([]);
    useEffect(() => {
        getEventsStartDateSorted().then(result =>{
            setSomeEvents(result.data)
        })
    }, []);
    const filteredEvents = someEvents.filter(ev => ev.city?._id === explorePlaceId);
    // const filteredEvents = someEvents;

    const handleMonthChange = (year: number, month: number) => {
        setCurrentYear(year);
        setCurrentMonth(month);
    };

    return (
        <div className="events-section">
            <div className="calendar-wrapper">
                <Calendar filteredEvents={filteredEvents} onMonthChange={handleMonthChange} />
            </div>
            <ListEvents events={filteredEvents} year={currentYear} month={currentMonth} />
        </div>
    );
};

export default Events;
