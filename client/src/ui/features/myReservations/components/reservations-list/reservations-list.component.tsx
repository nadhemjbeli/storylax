// src/ui/features/my-reservations/components/reservations/reservations-list.component.tsx

import React, { useEffect, useState } from 'react';
import { getQueriedHotelReservations } from '../../../../../data/hotel/hotel-reservations.data.ts';
import { IHotelReservation } from '../../../../../data/hotel/hotel-reservations.data.ts';
import { ReactComponent as CheckIn } from '../../../../../assets/svg/check-in.icon.svg';
import { ReactComponent as CheckOut } from '../../../../../assets/svg/check-out.icon.svg';
import './reservations-list.style.scss';
import { api_url } from '../../../../../utils/domain/back.ts';
import { getReservationState } from '../../../../../utils/reservationStates.ts';
import Modal from '../../../../components/modal/modal.component.tsx';
import api from "../../../../../utils/api.ts";
import {IAddHotelReview} from "../../../../../data/hotel/hotel-review.data.ts";
import DatePicker from "react-datepicker"; // Import the modal component
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from "react-router-dom";

const HotelTravelerReservationsList: React.FC = () => {
    const [reservations, setReservations] = useState<IHotelReservation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
    const [isContinueModalOpen, setIsContinueModalOpen] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<null | 'taken' | 'given'>(null);
    const [currentReservation, setCurrentReservation] = useState<IHotelReservation | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const navigate = useNavigate()
    // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Date input state

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await getQueriedHotelReservations();
                setReservations(response.data); // Assuming the data is returned in response.data
                console.log('my reservations: ', response.data);
            } catch (error) {
                console.error('Failed to fetch reservations', error);
            }
        };
        fetchReservations();
    }, []);

    const changeKeysState = (reservation: IHotelReservation, keysState:string) => {
        console.log(keysState, reservation);
        // Implement your logic here after confirmation
        api.put(`/hotel-reservations/${reservation._id}`, {travelerKeyState:keysState}).then(response => {
            console.log('Updated reservation:', response.data);
            setReservations(reservations.map(r => r._id === reservation._id? response.data : r));
        })
    };

    const handleModalConfirm = () => {
        if (currentAction && currentReservation) {
            changeKeysState(currentReservation, currentAction);
        }
        setIsModalOpen(false); // Close modal after confirmation
    };
    const handleStarClick = (index: number) => {
        setRating(index + 1); // Sets the rating based on the star clicked
    };
    const handleSubmit = async () => {
        const reviewData: IAddHotelReview = {
            hotelId: currentReservation?.hotel._id || '',
            reservationId: currentReservation?._id || '',
            rating,
            comment,
        };
        console.log('Review submitted:', reviewData);
        await api.post('/hotel-reviews',reviewData).then(response =>{
            console.log('Review added:', response.data);
            api.put(`/hotel-reservations/${currentReservation?._id}`, {commented:true}).then(response=>{
                console.log('Updated reservation:', response.data);
                setReservations(reservations.map(r => r._id === response.data?._id? response.data : r));
            })
        })
        // Reset form fields
        setRating(0);
        setComment('');
        setIsCommentModalOpen(false); // Close the modal after submission
    };

    const openModal = (action: 'taken' | 'given', reservation: IHotelReservation) => {
        setCurrentAction(action);
        setCurrentReservation(reservation);
        setIsModalOpen(true);
    };


    const renderCommentReview = (reservation: IHotelReservation) =>{
        if(!reservation.commented){
            return <button className='primary-button' onClick={()=> {
                setCurrentReservation(reservation)
                setIsCommentModalOpen(true)
            }}>Review</button>
        }
    }

    const renderReservationButton = (reservation: IHotelReservation) => {
        const checkInDate = new Date(reservation.checkIn);
        const checkOutDate = new Date(reservation.checkOut);
        const { travelerKeyState, hostKeyState } = reservation;

        if (getReservationState(checkInDate, checkOutDate) === 'pending') {
            return <h3 className="status-text">Not started yet</h3>;
        } else if (getReservationState(checkInDate, checkOutDate) === 'active') {
            if (travelerKeyState === 'pending') {
                return (
                    <button className="primary-button" onClick={() => openModal('taken', reservation)}>
                        I took the keys
                    </button>
                );
            } else if (travelerKeyState === 'taken') {
                return <h3 className="status-text">keys taken!</h3>
            }
        } else if (getReservationState(checkInDate, checkOutDate) === 'expired') {
            // return <h3 className="status-text">Reservation Expired</h3>;
            if (travelerKeyState === 'pending') {
                return (
                    <h3 className="status-text expired">Reservation Expired</h3>
                );
            } else if (travelerKeyState === 'taken') {
                if (hostKeyState==='pending'){
                    return <h3 className="status-text success">(took keys to host)</h3>;
                }
                else if(hostKeyState==='taken' || hostKeyState==='given') {
                    return (
                        <button className="primary-button" onClick={() => openModal('given', reservation)}>
                            I gave the keys
                        </button>
                    );
                }
            } else if (travelerKeyState === 'completed') {
                if (hostKeyState === 'completed')
                    return (
                        <div className='flex' style={{gap:5}}>
                            {renderCommentReview(reservation)}
                            <h3 className="status-text">Completed</h3>
                        </div>
                    );
                else
                    return <h3 className="status-text success">(gave keys to host)</h3>;
            }
        }

        return null;
    };

    const getDateColorClass = (checkInDate: Date, checkOutDate: Date) => {
        const inDate = new Date(checkInDate);
        const outDate = new Date(checkOutDate);
        const currentDate = new Date();

        if (currentDate < inDate) return 'not-started'; // Not started yet
        else if (currentDate >= inDate && currentDate <= outDate) return 'active'; // Currently active
        else return 'expired'; // Past the check-out date
    };



    // const handleContinueSubmit = () => {
    //     console.log('Date selected for continuation:', selectedDate);
    //     setIsContinueModalOpen(false);
    // };
    //
    // const handleModalClose = () => {
    //     setCurrentReservation(null);
    //     setIsContinueModalOpen(false);
    // };

    const handleCommentModalCancel = () => {
        setCurrentReservation(null)
        setIsCommentModalOpen(false)
    };


    const openContinueModal = (reservation: IHotelReservation) => {
        setCurrentReservation(reservation);
        setIsContinueModalOpen(true);
    };
    const openContinueScreen = (reservation: IHotelReservation) => {
        reservation?._id && navigate(`/my-reservations/continue/${reservation?._id}`)
    };
    const renderContinueReservationButton = (reservation: IHotelReservation) => {
        const checkInDate = new Date(reservation.checkIn);
        const checkOutDate = new Date(reservation.checkOut);
        const currentDate = new Date();

        if (currentDate >= checkInDate && currentDate <= checkOutDate) {
            return (
                <button className="primary-button" onClick={() => openContinueScreen(reservation)}>
                    Continue Reservation
                </button>
            );
        }

        // Other existing conditions
        // ...
    };

    return (
        <div className="my-reservations">
            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <div key={reservation._id} className="reservation-card">
                        <img
                            src={`${api_url}/${reservation.hotel.principalImage?.default}`}
                            alt={reservation.hotel.title}
                            className="reservation-image"
                        />
                        <div className="reservation-details">
                            {renderContinueReservationButton(reservation)}
                            <div className="reservation-title">
                                <h3>{reservation.hotel.title}</h3>
                                <p>
                                    $ {reservation.totalPrice.toFixed(2)}
                                </p>
                            </div>
                            <div className="reservation-footer">
                                <div className={`dates ${getDateColorClass(reservation.checkIn, reservation.checkOut)}`}>
                                    <div className="check-in-out-container">
                                        <CheckIn className="date-icon" />
                                        <p>{new Date(reservation.checkIn).toLocaleDateString()}</p>
                                    </div>
                                    <div className="check-in-out-container">
                                        <CheckOut className="date-icon" />
                                        <p>{new Date(reservation.checkOut).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {renderReservationButton(reservation)}
                            </div>

                        </div>
                    </div>
                ))
            ) : (
                <p>No reservations found.</p>
            )}

            {/* Modal for confirmation */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className='modal-title'>Confirm Action</h2>
                <p className='modal-question'>
                    Are you sure you {currentAction === 'taken' ? 'took the keys' : 'gave the keys'} for this reservation?
                </p>
                <div className="modal-buttons">
                    <button className="primary-button" onClick={handleModalConfirm}>
                        Confirm
                    </button>
                    <button className="secondary-button" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </Modal>

            {/* Modal for Comment for reservation */}
            <Modal isOpen={isCommentModalOpen} onClose={handleCommentModalCancel}>
                <h2 className='modal-title'>Leave a Review</h2>
                <div className="review-form">
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={`star ${index < rating ? 'filled' : ''}`}
                                onClick={() => handleStarClick(index)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                        rows={4}
                    />
                    <div className="modal-buttons">
                        <button className="primary-button" onClick={handleSubmit}>Submit</button>
                        <button className="secondary-button" onClick={handleCommentModalCancel}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HotelTravelerReservationsList;
