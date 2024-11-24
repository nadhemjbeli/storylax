import React, { useState } from 'react';
import './cities-table.style.scss';
import { ReactComponent as EditIcon } from "../../../../../../assets/svg/admin/edit.icon.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../assets/svg/admin/delete.icon.svg";
import { Link } from "react-router-dom";
import ConfirmationModal from "./confirmation/confirmation-modal.component.tsx";
import { ICitySchema } from "../../../../../../data/city.data.ts";

interface CityTableProps {
    cities: ICitySchema[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const CityTable: React.FC<CityTableProps> = ({ cities, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'name',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState<ICitySchema | null>(null);

    const totalPages = Math.ceil(cities.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (city: ICitySchema) => {
        setSelectedCity(city);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedCity) {
            onDelete(selectedCity._id || '');
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

    const filteredCities = cities.filter((city) => {
        const nameMatch = city.name.toLowerCase().includes(searchQuery);
        const locationMatch = city.location ? `${city.location.lat}, ${city.location.long}`.includes(searchQuery) : false;

        return nameMatch || locationMatch;
    });

    const sortedCities = [...filteredCities].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'name') {
            comparison = a.name.localeCompare(b.name);
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedCities = sortedCities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="city-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by city name or location..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="city-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('name')}>
                        City Name {sortConfig.column === 'name' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Location (Lat, Long)</th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedCities.map((city) => (
                    <tr key={city._id} className="table-row">
                        <td className="table-data">{city.name}</td>
                        <td className="table-data">{city.location ? `${city.location.lat}, ${city.location.long}` : 'N/A'}</td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <Link to={`/admin/update-city/${city._id}`}>
                                    <button className="edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDeleteClick(city)}>
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
                blogTitle={selectedCity?.name || ''}
            />
        </div>
    );
};

export default CityTable;
