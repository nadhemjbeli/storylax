// src/ui/host/feature/hotel/components/reservations-list-by-customer/reservations-list-by-customer.component.tsx

import React, { useEffect, useState } from 'react';
import {
    getCustomerReservationsByHotelHost
} from '../../../../../../data/hotel/hotel-reservations.data.ts';
import { IHotelReservation } from '../../../../../../data/hotel/hotel-reservations.data.ts';
import { ReactComponent as CheckIn } from '../../../../../../assets/svg/check-in.icon.svg';
import { ReactComponent as CheckOut } from '../../../../../../assets/svg/check-out.icon.svg';
import './reservations-list-by-customer.style.scss';
import { api_url } from '../../../../../../utils/domain/back.ts';
import { getReservationState } from '../../../../../../utils/reservationStates.ts';
import Modal from '../../../../../components/modal/modal.component.tsx';
import api from "../../../../../../utils/api.ts";
import {IUserData, showUserData} from "../../../../../../data/authenticate/user.data.ts"; // Import the modal component

interface IReservationsListProps {
    customerId: string;
}

const HotelReservationsListByCustomer: React.FC <IReservationsListProps> = ({customerId}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<null | 'taken' | 'given' | 'completed'>(null);
    const [currentReservation, setCurrentReservation] = useState<IHotelReservation | null>(null);

    const [reservationsByCustomer, setReservationsByCustomer] = useState<IHotelReservation[]>([])
    const [customer, setCustomer] = useState<IUserData>()
    useEffect(() => {
        const fetchReservationsAndCustomer = async () =>{
            try {
                customerId && await getCustomerReservationsByHotelHost(customerId).then(response=>{
                    setReservationsByCustomer(response.data)
                })
                customerId && await showUserData(customerId).then(response=>{
                    setCustomer(response.data)
                })
            }
            catch (error) {
                console.error('Error fetching reservations:', error);
            }
        }
        fetchReservationsAndCustomer();
    }, []);

    const changeKeysState = (reservation: IHotelReservation, keysState: string) => {
        console.log(keysState, reservation);
        // Implement your logic here after confirmation
        api.put(`/hotel-reservations/${reservation._id}`, {hostKeyState:keysState}).then(response => {
            console.log('Updated reservation:', response.data);
            setReservationsByCustomer(reservationsByCustomer.map(r => r._id === reservation._id? response.data : r));
        })
    };

    const completedKeysState = (reservation: IHotelReservation) => {
        console.log('completed', reservation);
        // Implement your logic here after confirmation
        api.put(`/hotel-reservations/${reservation._id}`, {hostKeyState:'completed', travelerKeyState:'completed'}).then(response => {
            console.log('Updated reservation:', response.data);
            setReservationsByCustomer(reservationsByCustomer.map(r => r._id === reservation._id? response.data : r));
        })
    };

    const handleModalConfirm = () => {
        if (currentAction && currentReservation) {
            if (currentReservation.travelerKeyState === 'given' && currentReservation.hostKeyState === 'given') {
                completedKeysState(currentReservation);
            }
            else changeKeysState(currentReservation, currentAction);
        }
        setIsModalOpen(false); // Close modal after confirmation
    };

    const openModal = (action: 'taken' | 'given' | 'completed', reservation: IHotelReservation) => {
        setCurrentAction(action);
        setCurrentReservation(reservation);
        setIsModalOpen(true);
    };

    const renderReservationButton = (reservation: IHotelReservation) => {
        const checkInDate = new Date(reservation.checkIn);
        const checkOutDate = new Date(reservation.checkOut);
        const { travelerKeyState, hostKeyState } = reservation;

        if (getReservationState(checkInDate, checkOutDate) === 'pending') {
            return <h3 className="status-text">Not started yet</h3>;
        } else if (getReservationState(checkInDate, checkOutDate) === 'active') {
            if (hostKeyState === 'pending') {
                return (
                    <button className="primary-button" onClick={() => openModal('given', reservation)}>
                        I gave the keys
                    </button>
                );
            } else if (hostKeyState === 'given') {
                return <h3 className="status-text">keys given!</h3>
            }
        } else if (getReservationState(checkInDate, checkOutDate) === 'expired') {
            // return <h3 className="status-text">Reservation Expired</h3>;
            if (hostKeyState === 'pending') {
                return (
                    <h3 className="status-text expired">Reservation Expired</h3>
                );
            } else if (hostKeyState === 'given') {
                if (travelerKeyState==='pending'){
                    return (
                        <h3 className="status-text expired">Reservation Expired</h3>
                    );
                }
                else if(travelerKeyState==='taken') {

                    return (
                        <button className="primary-button" onClick={() => openModal('given', reservation)}>
                            I've got keys back
                        </button>
                    );
                }
                else if(travelerKeyState==='given') {

                    return (
                        <button className="primary-button" onClick={() => openModal('completed', reservation)}>
                            Complete
                        </button>
                    );
                }
            }
            else
            if (hostKeyState === 'pending') {
                if (travelerKeyState === 'given')
                    return <h3 className="status-text">customer gave the keys</h3>;
                else
                    return (
                        <button className="primary-button" onClick={() => openModal('given', reservation)}>
                            I gave the keys
                        </button>
                    )
                ;
            }
            else if (hostKeyState === 'taken') {
                if (travelerKeyState === 'given')
                    return <h3 className="status-text">Completed</h3>;
                else
                    return <h3 className="status-text success">Waiting for the client</h3>;
            }
            else if (hostKeyState === 'completed') {
                if (travelerKeyState === 'completed')
                    return (
                            <h3 className="status-text">Completed</h3>
                    );
                else
                    return <h3 className="status-text success">Waiting for the client</h3>;
            }
        }

        return null;
    };
    // Add this function to determine the color based on the date
    const getDateColorClass = (checkInDate: Date, checkOutDate: Date) => {
        const inDate = new Date(checkInDate);
        const outDate = new Date(checkOutDate);
        const currentDate = new Date();
        // console.log(`in date: ${inDate}, out date: ${outDate}, current date: ${currentDate}`)
        if (currentDate < inDate) return 'not-started'; // Not started yet
        else if (currentDate >= inDate && currentDate <= outDate) return 'active'; // Currently active
        else return 'expired'; // Past the check-out date
    };


    return (
        <>
            <div className="reservations-list-by-user">
                {reservationsByCustomer.length > 0 ? (
                    reservationsByCustomer.map((reservation) => (
                        <div key={reservation._id} className="reservation-card">
                            <img
                                src={`${api_url}/${reservation.hotel.principalImage?.default}`}
                                alt={reservation.hotel.title}
                                className="reservation-image"
                            />
                            <div className="reservation-details">
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

            </div>

            {/* Modal for confirmation */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Confirm Action</h2>
                <p>
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
        </>
    );
};

export default HotelReservationsListByCustomer;
