// src/ui/host/features/hotel/components/reserved-users-table.component.tsx
import React, { useState } from 'react';
import './reserved-users-table.style.scss';
import { IUserData } from '../../../../../../data/authenticate/user.data.ts';
import { ReactComponent as PaymentIcon } from '../../../../../../assets/svg/payment.icon.svg';
import {Link} from "react-router-dom";

interface UserTableProps {
    reservedUsers: IUserData[];
    itemsPerPage?: number;
}

const ReservedUsersTable: React.FC<UserTableProps> = ({ reservedUsers, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'fullName',
        direction: 'default',
        clickCount: 0
    });

    const totalPages = Math.ceil(reservedUsers.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
            setSortConfig({ column: 'fullName', direction: 'default', clickCount: 0 }); // Reset to default
        } else {
            setSortConfig({ column, direction, clickCount: newClickCount });
        }

        setCurrentPage(1); // Reset to the first page when sorting
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredUsers = reservedUsers.filter((user) => {
        const fullNameMatch = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(searchQuery);
        const emailMatch = user.email.toLowerCase().includes(searchQuery);

        return fullNameMatch || emailMatch;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'fullName') {
            const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            comparison = fullNameA.localeCompare(fullNameB);
        } else if (sortConfig.column === 'email') {
            comparison = a.email.localeCompare(b.email);
        } else if (sortConfig.column === 'role') {
            comparison = (a.role as string).localeCompare(b.role as string);
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by full name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="admin-table">
                <thead>
                <tr>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('fullName')}>
                        Full Name {sortConfig.column === 'fullName' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('email')}>
                        Email {sortConfig.column === 'email' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('role')}>
                        Role {sortConfig.column === 'role' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user) => (
                    <tr key={user._id} className="admin-table-row">
                        <td className="admin-table-data">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="admin-table-data">{user.email}</td>
                        <td className="admin-table-data"><strong>{user.role}</strong></td>
                        <td className="admin-table-data">
                            <div className="admin-table-buttons">
                                <Link to={`/host/reservations-by-customer/${user._id}`}>
                                    <button className="admin-interests-button">
                                        <PaymentIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredUsers && filteredUsers.length >= 10 &&
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
        </div>
    );
};

export default ReservedUsersTable;
