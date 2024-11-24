import React, { useState } from 'react';
import './events-table.style.scss';
import { IEventCard } from '../../../../../../data/explore/events.data.ts';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';
import {api_url} from "../../../../../../utils/domain/back.ts";

interface EventCardsTableProps {
    eventCards: IEventCard[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const EventCardsTable: React.FC<EventCardsTableProps> = ({ eventCards, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'name',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEventCard | null>(null);

    const totalPages = Math.ceil(eventCards.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (event: IEventCard) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedEvent) {
            onDelete(selectedEvent._id || '');
            setIsModalOpen(false);
        }
    };

    const handleSort = (column: string) => {
        const newClickCount = sortConfig.column === column ? sortConfig.clickCount + 1 : 1;

        let direction: 'asc' | 'desc' | 'default' = 'asc';
        if (newClickCount === 3) {
            direction = 'default';
        } else if (newClickCount === 2) {
            direction = 'desc';
        }

        if (newClickCount === 3) {
            setSortConfig({ column: 'name', direction: 'default', clickCount: 0 });
        } else {
            setSortConfig({ column, direction, clickCount: newClickCount });
        }

        setCurrentPage(1); // Reset to the first page when sorting
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredEvents = eventCards.filter((eventCard) => {
        const nameMatch = eventCard.name.toLowerCase().includes(searchQuery);
        return nameMatch;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        const comparison = a.name.localeCompare(b.name);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="event-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="event-table">
                <thead>
                <tr>
                    <th className="thead-item">Image</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('name')}>
                        Name {sortConfig.column === 'name' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedEvents.map((eventCard) => (
                    <tr key={eventCard._id} className="table-row">
                        <td className="table-data">
                            <img src={`${api_url}/${eventCard.image}`} alt={eventCard.name} className="event-card-image" />
                        </td>
                        <td className="table-data">{eventCard.name}</td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <button className="delete-button" onClick={() => handleDeleteClick(eventCard)}>
                                    <DeleteIcon className="admin-manage-icon" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={selectedEvent?.name || ''}
                element={'event element'}
            />
        </div>
    );
};

export default EventCardsTable;
