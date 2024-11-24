// src/ui/host/features/hotel/components/hotels-table.component.tsx
import React, { useState } from 'react';
import './hotels-table.style.scss';
import { IHotel } from '../../../../../../data/hotel/hotel.data.ts';
import { ReactComponent as BookingsIcon } from '../../../../../../assets/svg/admin/tickets.icon.svg';
import { ReactComponent as EditIcon } from '../../../../../../assets/svg/admin/edit.icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';

interface HotelTableProps {
    hotels: IHotel[];
    onDelete: (id: string) => void;
    itemsPerPage?: number;
}

const HotelTable: React.FC<HotelTableProps> = ({ hotels, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'title',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);

    const totalPages = Math.ceil(hotels.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (hotel: IHotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedHotel) {
            onDelete(selectedHotel._id || '');
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

    const filteredHotels = hotels.filter((hotel) => {
        const titleMatch = hotel.title.toLowerCase().includes(searchQuery);

        return titleMatch;
    });

    const sortedHotels = [...filteredHotels].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'title') {
            comparison = a.title.localeCompare(b.title);
        } else if (sortConfig.column === 'minMaxDays') {
            comparison = (a.maxDays - a.minDays) - (b.maxDays - b.minDays);
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedHotels = sortedHotels.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="hotel-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="hotel-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('title')}>
                        Title {sortConfig.column === 'title' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    {/*<th className="thead-item admin-cursor-pointer" onClick={() => handleSort('host')}>*/}
                    {/*    Host {sortConfig.column === 'host' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}*/}
                    {/*</th>*/}
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('minMaxDays')}>
                        Min - Max Days {sortConfig.column === 'minMaxDays' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedHotels.map((hotel) => (
                    <tr key={hotel._id} className="table-row">
                        <td className="table-data">{hotel.title}</td>
                        {/*<td className="table-data">{`${(hotel.host as any)?.firstName} ${(hotel.host as any)?.lastName}`}</td>*/}
                        <td className="table-data">
                            {hotel.minDays} - {hotel.maxDays}
                        </td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <Link to={`/host/booking-hotels/${hotel._id}`}>
                                    <button className="bookings-button">
                                        <BookingsIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <Link to={`/host/update-hotel/${hotel._id}`}>
                                    <button className="edit-button">
                                        <EditIcon className="admin-manage-icon edit-icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDeleteClick(hotel)}>
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
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={selectedHotel?.title || ''}
                element={'hotel element'}
            />
        </div>
    );
};

export default HotelTable;
