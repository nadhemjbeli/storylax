import React, { useState } from 'react';
import './events-table.style.scss';
import { IEvent } from '../../../../../../data/explore/events.data.ts';
import { ReactComponent as ImageIcon } from '../../../../../../assets/svg/admin/images.icon.svg';
import { ReactComponent as EditIcon } from '../../../../../../assets/svg/admin/edit.icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';

interface EventTableProps {
    events: IEvent[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const EventTable: React.FC<EventTableProps> = ({ events, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'title',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

    const totalPages = Math.ceil(events.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (event: IEvent) => {
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
            setSortConfig({ column: 'title', direction: 'default', clickCount: 0 }); // Reset to default
        } else {
            setSortConfig({ column, direction, clickCount: newClickCount });
        }

        setCurrentPage(1); // Reset to the first page when sorting
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredEvents = events.filter((event) => {
        const titleMatch = event.title.toLowerCase().includes(searchQuery);
        const cityMatch = event.city?.name.toLowerCase().includes(searchQuery);

        return titleMatch || cityMatch;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'title') {
            comparison = a.title.localeCompare(b.title);
        } else if (sortConfig.column === 'city') {
            comparison = (a.city?.name || '').localeCompare(b.city?.name || '');
        } else if (sortConfig.column === 'startDate') {
            comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        } else if (sortConfig.column === 'endDate') {
            comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatus = (event: IEvent) => {
        const now = new Date().getTime();
        const startDate = new Date(event.startDate).getTime();
        const endDate = new Date(event.endDate).getTime();

        if (startDate > now) {
            return 'Not Yet';
        } else if (now >= startDate && now <= endDate) {
            return 'In Progress';
        } else if (endDate < now) {
            return 'Ended';
        }
        return 'Unknown';
    };

    const getDatesColor = (event: IEvent) => {
        const now = new Date().getTime();
        const startDate = new Date(event.startDate).getTime();
        const endDate = new Date(event.endDate).getTime();

        if (startDate > now) {
            return '#0091ff';
        } else if (now >= startDate && now <= endDate) {
            return '#00d51f';
        } else if (endDate < now) {
            return '#ff0000';
        }
        return 'Unknown';
    };

    return (
        <div className="event-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by title or city..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="event-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('title')}>
                        Title {sortConfig.column === 'title' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('city')}>
                        City {sortConfig.column === 'city' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('startDate')}

                    >
                        Start Date {sortConfig.column === 'startDate' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('endDate')}>
                        End Date {sortConfig.column === 'endDate' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Status</th> {/* New Status column */}
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedEvents.map((event) => (
                    <tr key={event._id} className="table-row">
                        <td className="table-data">{event.title}</td>
                        <td className="table-data">{event.city?.name}</td>
                        <td className="table-data"
                            style={{color: getDatesColor(event)}}
                        >{new Date(event.startDate).toLocaleDateString()}</td>
                        <td className="table-data"
                            style={{color: getDatesColor(event)}}
                        >{new Date(event.endDate).toLocaleDateString()}</td>
                        <td className="table-data">{getStatus(event)}</td> {/* Status data */}
                        <td className="table-data">
                            <div className="table-buttons">
                                <Link to={`/admin/event-cards/${event._id}`}>
                                    <button className="images-button">
                                        <ImageIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <Link to={`/admin/update-event/${event._id}`}>
                                    <button className="edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDeleteClick(event)}>
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
                title={selectedEvent?.title || ''}
                element={'event element'}
            />
        </div>
    );
};

export default EventTable;
