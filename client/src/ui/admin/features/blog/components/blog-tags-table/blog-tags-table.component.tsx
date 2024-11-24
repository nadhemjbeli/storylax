// src/ui/components/modal/modal.component.tsx
import React, { useState } from 'react';
import './blog-tags-table.style.scss';
import { ITagData } from '../../../../../../data/blog-page/blogs.data.ts';
import {ReactComponent as EditIcon} from "../../../../../../assets/svg/admin/edit.icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../../../assets/svg/admin/delete.icon.svg";
import {Link} from "react-router-dom";
import ConfirmationModal from "../../../../components/confirm-deletion/confirmation-modal.component.tsx";

interface BlogTableProps {
    tags: ITagData[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const BlogTagTable: React.FC<BlogTableProps> = ({ tags, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'name',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<ITagData | null>(null);

    const totalPages = Math.ceil(tags.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



    const handleDeleteClick = (tag: ITagData) => {
        setSelectedTag(tag);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedTag) {
            onDelete(selectedTag._id as string);
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

    const filteredBlogTags = tags.filter((tag) => {
        return tag.name.toLowerCase().includes(searchQuery);
    });

    const sortedBlogTags = [...filteredBlogTags].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'name') {
            comparison = a.name.localeCompare(b.name);
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedBlogTags = sortedBlogTags.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="admin-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by title, city, or promoted status..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="admin-table">
                <thead>
                <tr>
                    <th className="admin-thead-item admin-cursor-pointer" onClick={() => handleSort('name')}>
                        Name {sortConfig.column === 'name' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="admin-thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedBlogTags.map((tag) => (
                    <tr key={tag._id} className="admin-table-row">
                        <td className="admin-table-data">{tag.name}</td>
                        <td className="admin-table-data">
                            <div className="admin-table-buttons">
                                <Link to={`/admin/update-blog-tag/${tag._id}`}>
                                    <button className="admin-edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="admin-delete-button" onClick={() => handleDeleteClick(tag)}>
                                    <DeleteIcon className="admin-manage-icon" />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
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
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={selectedTag?.name || ''}
                element={"tag name"}
            />
        </div>
    );
};

export default BlogTagTable;
