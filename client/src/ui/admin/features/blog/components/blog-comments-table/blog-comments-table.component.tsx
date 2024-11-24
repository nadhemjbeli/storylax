// src/ui/features/blog/blog-comments-table/blog-comments.component.tsx
import React, { useState } from 'react';
import './blog-comments-table.style.scss';
import { IBlogCommentData } from '../../../../../../data/blog-page/blogs.data.ts';
import {ReactComponent as DeleteIcon} from "../../../../../../assets/svg/admin/delete.icon.svg";
import ConfirmationModal from "../../../../components/confirm-deletion/confirmation-modal.component.tsx";

interface BlogCommentsTableProps {
    comments: IBlogCommentData[];
    onDelete: (_id: string) => void;
    itemsPerPage?: number;
}

const BlogCommentsTable: React.FC<BlogCommentsTableProps> = ({ comments, onDelete, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<IBlogCommentData | null>(null);

    const totalPages = Math.ceil(comments.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (comment: IBlogCommentData) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedComment) {
            onDelete(selectedComment._id || '');
            setIsModalOpen(false);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredComments = comments.filter((comment) => {
        return comment.comment.toLowerCase().includes(searchQuery);
    });

    const paginatedComments = filteredComments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="blog-comments-table-container">
            <h2>Search:</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search by comment..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table className="blog-comments-table">
                <thead className='table-head'>
                <tr className='table-row'>
                    <th className='thead-item'>Comment</th>
                    <th className='thead-item'>User</th>
                    <th className='thead-item'>Created At</th>
                    <th className='thead-item'>Actions</th>
                </tr>
                </thead>
                <tbody>
                {paginatedComments.map((comment) => (
                    <tr key={comment._id} className="table-row">
                        <td className="table-data">{comment.comment}</td>
                        <td className="table-data">{`${comment.user?.firstName} ${comment.user?.lastName}`}</td>
                        <td className="table-data">{new Date(comment.createdAt || '').toLocaleDateString()}</td>
                        <td className="table-data">
                            <button className="delete-button" onClick={() => handleDeleteClick(comment)}>
                                <DeleteIcon className="admin-manage-icon" />
                            </button>
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
                title={selectedComment?.comment || ''}
                element={'comment'}
            />
        </div>
    );
};

export default BlogCommentsTable;
