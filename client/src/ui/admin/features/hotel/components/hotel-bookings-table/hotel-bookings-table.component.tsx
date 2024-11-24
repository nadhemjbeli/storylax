// src/ui/admin/features/hotel/components/hotel-bookings-table/hotel-bookings-table.component.tsx
import React, { useState } from 'react';
import './hotel-bookings-table.style.scss';
import { IBookingHotel } from '../../../../../../data/hotel/booking-hotel.data.ts';
import { ReactComponent as EditIcon } from '../../../../../../assets/svg/admin/edit.icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';
import { format } from 'date-fns';

interface HotelBookingsTableProps {
    bookings: IBookingHotel[];
    onDelete: (id: string) => void;
    itemsPerPage?: number;
}

const HotelBookingsTable: React.FC<HotelBookingsTableProps> = ({ bookings, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'startDate',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<IBookingHotel | null>(null);

    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (booking: IBookingHotel) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedBooking) {
            onDelete(selectedBooking._id || '');
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
            setSortConfig({ column: 'startDate', direction: 'default', clickCount: 0 }); // Reset to default
        } else {
            setSortConfig({ column, direction, clickCount: newClickCount });
        }

        setCurrentPage(1); // Reset to the first page when sorting
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredBookings = bookings.filter((booking) => {
        const hotelTitleMatch = booking.hotel.title.toLowerCase().includes(searchQuery);
        const userMatch = `${booking.user.firstName} ${booking.user.lastName}`.toLowerCase().includes(searchQuery);

        return hotelTitleMatch || userMatch;
    });

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'startDate') {
            comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        } else if (sortConfig.column === 'endDate') {
            comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        } else if (sortConfig.column === 'travelers') {
            comparison = a.travelers - b.travelers;
        } else if (sortConfig.column === 'rooms') {
            comparison = a.rooms - b.rooms;
        } else if (sortConfig.column === 'status') {
            comparison = a.status.localeCompare(b.status);
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedBookings = sortedBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in progress':
                return 'blue';
            case 'accepted':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return '';
        }
    };

    return (
        <div className="hotel-bookings-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by hotel or host..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="hotel-bookings-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('startDate')}>Hotel</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('startDate')}>Host</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('startDate')}>Start Date</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('endDate')}>End Date</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('travelers')}>Travelers</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('rooms')}>Rooms</th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedBookings.map((booking) => (
                    <tr key={booking._id}>
                        <td className="table-data">{booking.hotel?.title}</td>
                        <td className="table-data">{booking.user?.firstName} {booking.user?.lastName}</td>
                        <td className="table-data">{format(new Date(booking.startDate), 'EEE dd MMM yyyy')}</td>
                        <td className="table-data">{format(new Date(booking.endDate), 'EEE dd MMM yyyy')}</td>
                        <td className="table-data">{booking.travelers}</td>
                        <td className="table-data">{booking.rooms}</td>
                        <td className="table-data" style={{ color: getStatusColor(booking.status) }}>{booking.status}</td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <Link to={`/admin/update-hotel-booking/${booking._id}`}>
                                    <button className="edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDeleteClick(booking)}>
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
                title={selectedBooking?.hotel.title || ''}
                element={'booking'}
            />
        </div>
    );
};

export default HotelBookingsTable;
