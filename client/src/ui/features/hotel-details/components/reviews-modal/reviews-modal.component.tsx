import React, { useEffect, useState } from 'react';
import { getHotelReviewsByHotel, IHotelReview } from '../../../../../data/hotel/hotel-review.data.ts';
import './reviews-modal.styles.scss';
import Modal from "../../../../components/modal/modal.component.tsx";

interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotelId: string;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, hotelId }) => {
    const [reviews, setReviews] = useState<IHotelReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchReviews();
        }
    }, [isOpen]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await getHotelReviewsByHotel(hotelId);
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="reviews-modal-content">
                <h2>Hotel Reviews</h2>
                {loading ? (
                    <p>Loading reviews...</p>
                ) : (
                    reviews.length > 0 ? (
                        <ul className="reviews-list">
                            {reviews.map(review => (
                                <>
                                    <li key={review._id} className="review-wrapper">
                                        <div className="review-content">
                                            <div className="review-avatar">
                                                {review.user.firstName[0]}
                                            </div>
                                            <div className="review-item">
                                                <div className="review-author">{review.user.firstName}</div>
                                                <p className="review-comment">{review.comment}</p>
                                            </div>
                                        </div>
                                        <div className="star-rating">
                                            {[...Array(5)].map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`star ${index < review.rating ? 'filled' : ''}`}
                                                >
                                                ★
                                            </span>
                                            ))}
                                        </div>
                                    </li>
                                    <hr style={{backgroundColor:'#b0b0b0', height:'1px', border:0}}/>
                                </>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available.</p>
                    )
                )}
            </div>
        </Modal>
    );
};

export default ReviewsModal;
