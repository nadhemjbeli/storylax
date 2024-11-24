import React, { useEffect, useState } from 'react';
import './event.style.scss';
import {Link, useParams} from 'react-router-dom';
import {getEventCardsByEvent, IEvent, IEventCard, showEventData} from '../../../../../data/explore/events.data.ts';
import { api_url } from '../../../../../utils/domain/back.ts';

const EventPage: React.FC = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState<IEvent>();
    const [eventCards, setEventCards] = useState<IEventCard[]>();

    useEffect(() => {
        showEventData(eventId || '').then((data: any) => {
            setEvent(data.data);
        });

        getEventCardsByEvent(eventId || '').then((data: any) => {
            setEventCards(data.data);
        });

    }, [eventId]);

    return (
        <div className="event-page">
            {event ? (
                <>
                    {/* Hero Section */}
                    <div className="event-hero">
                        <img src={`${api_url}/${event.principalImage.default}`} alt={event.title} className="event-image" />
                        <div className="event-info">
                            <h1 className="event-title">{event.title}</h1>
                            <p className="event-city">{event.city.name}</p>

                            {
                                eventCards && eventCards.length>=4 &&
                                <Link to={`/memory-game/${eventId}`}>
                                    {/* Play Memory Game Button */}
                                    <button className="memory-game-btn">
                                        Play the memory game
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>

                    {/* Event Details Section */}
                    <div className="event-details">
                        <section className="event-section">
                            <h2>About the Event</h2>
                            <p className="event-resume">{event.resume}</p>
                            <br/>
                            <div
                                className="event-description"
                                dangerouslySetInnerHTML={{ __html: event.description }}
                            />
                        </section>

                        {/* Event Dates */}
                        <section className="event-section event-dates">
                            <h2>Event Dates</h2>
                            <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleDateString()}</p>
                        </section>

                        {/* Author Information (optional) */}
                        {event.author && (
                            <section className="event-section event-author">
                                <div className="author-avatar">
                                    {event.author.firstName[0]}
                                </div>
                                <div className="author-info">
                                    <p className="author-name">{event.author.firstName} {event.author.lastName}</p>
                                    <p className="author-role">Organizer</p> {/* Optional role */}
                                </div>
                            </section>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default EventPage;
