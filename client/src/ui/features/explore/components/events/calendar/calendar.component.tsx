import React, { useEffect, useState } from 'react';
import { ReactComponent as ChevronLeftIcon } from "../../../../../../assets/svg/explore/chevron-left.icon.svg";
import { ReactComponent as ChevronRightIcon } from "../../../../../../assets/svg/explore/chevron-right.icon.svg";
import "./calendar.style.scss";
import { Link } from "react-router-dom";
import { EventPlace } from "../../../../../../data/explore/events.data.ts";

interface CalendarProps {
    filteredEvents: EventPlace[],
    onMonthChange: (year: number, month: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ filteredEvents, onMonthChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState<number[]>([]);

    useEffect(() => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        setDays(newDays);
        onMonthChange(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }, [currentDate]);

    const isToday = (day: number): boolean => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const getEventsForDay = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const date = new Date(dateStr);
        return filteredEvents.filter(event => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            return date >= startDate && date <= endDate;
        });
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button className="icon-container" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                    <ChevronLeftIcon className="icon" />
                </button>
                <div className="calendar-title">
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </div>
                <button className="icon-container" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                    <ChevronRightIcon className="icon" />
                </button>
            </div>
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="calendar-day-name">
                        {day}
                    </div>
                ))}
                {days.map((day) => {
                    const eventsForDay = getEventsForDay(day);
                    return (
                        <div key={day} className={`calendar-day ${isToday(day) ? 'active' : ''}`}>
                            {day}
                            {eventsForDay.length > 0 && (
                                <>
                                    <div className="event-point"></div>
                                    <div className="event-dropdown">
                                        {eventsForDay.map(event => (
                                            <Link to="#" key={event._id} className="event-item">
                                                {event.title}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
