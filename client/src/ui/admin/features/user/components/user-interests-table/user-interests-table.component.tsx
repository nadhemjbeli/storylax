// src/ui/admin/features/user/components/user-interests-table/user-interests-table.component.tsx
import React, { useState } from 'react';
import './user-interests-table.style.scss';
import { IUserInterest } from '../../../../../../data/authenticate/user.data.ts';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/svg/admin/delete.icon.svg';
import { ReactComponent as EditIcon } from '../../../../../../assets/svg/admin/edit.icon.svg';
import ConfirmationModal from '../../../../components/confirm-deletion/confirmation-modal.component.tsx';
import { Link } from "react-router-dom";

interface UserInterestsTableProps {
    interests: IUserInterest[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const UserInterestsTable: React.FC<UserInterestsTableProps> = ({ interests, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'name',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState<IUserInterest | null>(null);

    const totalPages = Math.ceil(interests.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (interest: IUserInterest) => {
        setSelectedInterest(interest);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedInterest) {
            onDelete(selectedInterest._id || '');
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

    const filteredInterests = interests.filter((interest) =>
        interest.name.toLowerCase().includes(searchQuery)
    );

    const sortedInterests = [...filteredInterests].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortConfig.column === 'createdAt') {
            comparison = new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedInterests = sortedInterests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by interest name..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="admin-table">
                <thead>
                <tr>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('name')}>
                        Interest Name {sortConfig.column === 'name' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('createdAt')}>
                        Created At {sortConfig.column === 'createdAt' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedInterests.map((interest) => (
                    <tr key={interest._id} className="admin-table-row">
                        <td className="admin-table-data">{interest.name}</td>
                        <td className="admin-table-data">{new Date(interest.createdAt || '').toLocaleDateString()}</td>
                        <td className="admin-table-data">
                            <div className="admin-table-buttons">
                                <Link to={`/admin/update-interest/${interest._id}`}>
                                    <button className="admin-edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="admin-delete-button" onClick={() => handleDeleteClick(interest)}>
                                    <DeleteIcon className="admin-manage-icon" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredInterests.length >= itemsPerPage &&
                <div className="admin-pagination">
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
            }
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={selectedInterest ? selectedInterest.name : ''}
                element={selectedInterest && selectedInterest.name || 'interest'}
            />
        </div>
    );
};

export default UserInterestsTable;

