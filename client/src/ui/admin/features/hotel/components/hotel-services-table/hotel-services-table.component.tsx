// src/ui/admin/features/hotel/components/hotel-services-table/hotel-services-table.component.tsx
import React, { useState} from 'react';
import './hotel-services-table.style.scss';
import { IHotelService } from '../../../../../../data/hotel/hotel.data.ts';
import { ReactComponent as EditIcon } from '../../../../../../assets/svg/admin/edit.icon.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';

interface HotelServicesTableProps {
    hotelServices: IHotelService[]; // Added hotel ID to fetch services for a specific hotel
    onDelete: (id: string) => void;
    itemsPerPage?: number;
}

const HotelServicesTable: React.FC<HotelServicesTableProps> = ({ hotelServices, onDelete, itemsPerPage = 10 }) => {
    // const [services, setServices] = useState<IHotelService[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'name',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<IHotelService | null>(null);

    const totalPages = Math.ceil(hotelServices.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (service: IHotelService) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedService) {
            onDelete(selectedService._id || '');
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
            setSortConfig({ column: 'name', direction: 'default', clickCount: 0 }); // Reset to default
        } else {
            setSortConfig({ column, direction, clickCount: newClickCount });
        }

        setCurrentPage(1); // Reset to the first page when sorting
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredServices = hotelServices.filter((service) => {
        const nameMatch = service.name.toLowerCase().includes(searchQuery);
        const hotelTitleMatch = (service.hotel?.title || '').toLowerCase().includes(searchQuery);

        return nameMatch || hotelTitleMatch;
    });

    const sortedServices = [...filteredServices].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortConfig.column === 'hotel') {
            comparison = (a.hotel?.title || '').localeCompare(b.hotel?.title || '');
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedServices = sortedServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="hotel-services-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by service or hotel title..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="hotel-services-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('name')}>
                        Service Name {sortConfig.column === 'name' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('hotel')}>
                        Hotel {sortConfig.column === 'hotel' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedServices.map((service) => (
                    <tr key={service._id} className="table-row">
                        <td className="table-data">{service.name}</td>
                        <td className="table-data">{service.hotel?.title}</td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <button className="delete-button" onClick={() => handleDeleteClick(service)}>
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
                title={selectedService?.name || ''}
                element={'service element'}
            />
        </div>
    );
};

export default HotelServicesTable;
