import React from 'react';
import './matched-event.style.scss';
import {IEventCard} from "../../../../../data/explore/events.data.ts";
import {api_url} from "../../../../../utils/domain/back.ts";
import TopScores, {IScore} from "../top-scores/top-scores.component.tsx";

interface MatchedEventProps {
    matchedEvents: IEventCard[];
    allMatched: boolean; // New prop to track if all cards are matched
    eventId: string; // Event ID to fetch top scores from API (new prop)
    userRole: string; // User role
    scores: IScore[]; //
}

const MatchedEvent: React.FC<MatchedEventProps> = ({ scores, userRole, matchedEvents, eventId, allMatched }) => {
    return (
        <div className="matched-event">
            <h2>Matched Events</h2>
            {matchedEvents.length === 0 ? (
                <p>No events matched yet.</p>
            ) : (
                <div className='event-cards'>
                    {
                        matchedEvents.map((event) => (
                            <div key={event._id} className="matched-event-card">
                                <img src={`${api_url}/${event.image}`} alt={event.name} className="event-image" />
                                <div className="event-details">
                                    <h3>{event.name}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
            {allMatched && (
                <>
                    <p className="congrats-message">🎉 Congratulations! You've matched all event cards! 🎉</p>

                </>
            )}
            <TopScores scores={scores} userRole={userRole} allMatched={allMatched} eventId={eventId} /> {/* Render the TopScores component */}
        </div>
    );
};

export default MatchedEvent;
