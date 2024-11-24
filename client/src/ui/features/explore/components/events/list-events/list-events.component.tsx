import React, { useMemo } from 'react';
import { IEvent } from "../../../../../../data/explore/events.data.ts";
import { ReactComponent as CalendarIcon } from "../../../../../../assets/svg/explore/calendar.icon.svg";
import "./list-events.style.scss";
import { Link } from "react-router-dom";
import { api_url } from "../../../../../../utils/domain/back.ts";

interface ListEventsProps {
    events: IEvent[];
    year: number;
    month: number;
}

const formatDateMonthDay = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
};

const formatDayMonth = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return { day, month };
};

const ListEvents: React.FC<ListEventsProps> = ({ events, year, month }) => {


    const filteredEvents = events
        .filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month;
        })
        .slice(-6);
    // Calculate the event closest to the current date
    const closestEventId = useMemo(() => {
        const now = new Date();
        let closestEvent = null;
        let closestDiff = Infinity;

        filteredEvents.forEach(event => {
            const eventDate = new Date(event.startDate);
            const diff = Math.abs(eventDate.getTime() - now.getTime());
            if (diff < closestDiff) {
                closestDiff = diff;
                closestEvent = event._id;
            }
        });

        return closestEvent;
    }, [events]);
    return (
        <div className="list-events">
            {filteredEvents.map(event => {
                const { day, month } = formatDayMonth(event.startDate);
                return (
                    <Link to={`/event/${event._id}`} key={event._id} style={{ backgroundImage: `url(${api_url}/${event.principalImage?.medium})` }}
                          className={`event event-card ${event._id === closestEventId ? 'event-closest' : ''}`}>
                        <div className="event-date-box">
                            <h5>{day}</h5>
                            <h4>{month}</h4>
                        </div>
                        <div className="event-content">
                            {event._id === closestEventId && <div className="event-title">{event.title}</div>}
                            <div className="event-date">
                                <CalendarIcon className="calendar-icon" />
                                {formatDateMonthDay(event.startDate)} - {formatDateMonthDay(event.endDate)}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ListEvents;
