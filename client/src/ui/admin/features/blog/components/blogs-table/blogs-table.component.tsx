// src/ui/components/modal/modal.component.tsx
import React, { useState } from 'react';
import './blogs-table.style.scss';
import { IBlogData } from '../../../../../../data/blog-page/blogs.data.ts';
import {ReactComponent as EditIcon} from "../../../../../../assets/svg/admin/edit.icon.svg";
import {ReactComponent as ImagesIcon} from "../../../../../../assets/svg/admin/images.icon.svg";
import {ReactComponent as BlogComments} from "../../../../../../assets/svg/admin/comments.icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../../../assets/svg/admin/delete.icon.svg";
import {Link} from "react-router-dom";
import ConfirmationModal from "../../../../components/confirm-deletion/confirmation-modal.component.tsx";

interface BlogTableProps {
    blogs: IBlogData[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState<{ column: string, direction: 'asc' | 'desc' | 'default', clickCount: number }>({
        column: 'title',
        direction: 'default',
        clickCount: 0
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<IBlogData | null>(null);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



    const handleDeleteClick = (blog: IBlogData) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedBlog) {
            onDelete(selectedBlog._id || '');
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

    const filteredBlogs = blogs.filter((blog) => {
        const titleMatch = blog.title.toLowerCase().includes(searchQuery);
        const cityMatch = blog.city?.name.toLowerCase().includes(searchQuery);
        const promotedMatch = blog.promoted ? 'yes'.includes(searchQuery) : 'no'.includes(searchQuery);

        return titleMatch || cityMatch || promotedMatch;
    });

    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
        if (sortConfig.direction === 'default') return 0;

        let comparison = 0;
        if (sortConfig.column === 'title') {
            comparison = a.title.localeCompare(b.title);
        } else if (sortConfig.column === 'city') {
            comparison = (a.city?.name || '').localeCompare(b.city?.name || '');
        } else if (sortConfig.column === 'promoted') {
            comparison = (a.promoted === b.promoted ? 0 : (a.promoted ? 1 : -1));
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    const paginatedBlogs = sortedBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="blog-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by title, city, or promoted status..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="blog-table">
                <thead>
                <tr>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('title')}>
                        Title {sortConfig.column === 'title' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('city')}>
                        City {sortConfig.column === 'city' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item admin-cursor-pointer" onClick={() => handleSort('promoted')}>
                        Promoted {sortConfig.column === 'promoted' ? (sortConfig.direction === 'asc' ? '▲' : (sortConfig.direction === 'desc' ? '▼' : '')) : ''}
                    </th>
                    <th className="thead-item">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedBlogs.map((blog) => (
                    <tr key={blog._id} className="table-row">
                        <td className="table-data">{blog.title}</td>
                        <td className="table-data">{blog.city?.name}</td>
                        <td className="table-data">{blog.promoted ? 'Yes' : 'No'}</td>
                        <td className="table-data">
                            <div className="table-buttons">
                                <Link to={`/admin/blog-comments/${blog._id}`}>
                                    <button className="comments-button">
                                        <BlogComments className="admin-manage-icon" />
                                    </button>
                                </Link>
                                {/*<Link to={`/admin/blog-images/${blog._id}`}>*/}
                                {/*    <button className="images-button">*/}
                                {/*        <ImagesIcon className="admin-manage-icon" />*/}
                                {/*    </button>*/}
                                {/*</Link>*/}
                                <Link to={`/admin/update-blog/${blog._id}`}>
                                    <button className="edit-button">
                                        <EditIcon className="admin-manage-icon" />
                                    </button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDeleteClick(blog)}>
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
                title={selectedBlog?.title || ''}
                element={'blog title'}
            />
        </div>
    );
};

export default BlogTable;
