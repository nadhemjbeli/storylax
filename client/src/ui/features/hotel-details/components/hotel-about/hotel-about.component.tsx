import React, { useEffect, useState } from 'react';
import "./hotel-about.style.scss";
import { IHotel } from "../../../../../data/hotel/hotel.data.ts";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {addDays, parse, differenceInDays, format} from 'date-fns';
import { useFormik } from 'formik';
import { IUserData } from "../../../../../data/authenticate/user.data.ts";
import {useLocation, useNavigate} from "react-router-dom";
import Events from "../../../explore/components/events/events.component.tsx";
import ReviewsModal from "../reviews-modal/reviews-modal.component.tsx";

interface HotelAboutProps {
    hotel: IHotel;
}

const HotelAbout: React.FC<HotelAboutProps> = ({ hotel }) => {
    const [capacityError, setCapacityError] = useState<string | null>(null);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

    const openReviewsModal = () => setIsReviewsModalOpen(true);
    const closeReviewsModal = () => setIsReviewsModalOpen(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const defaultTravelers = parseInt(searchParams.get('persons') as string) || 1;
    const defaultRooms = parseInt(searchParams.get('rooms') as string) || 1;
    const defaultStartDate = searchParams.get('startDate')
        ? parse(searchParams.get('startDate') as string, 'dd/MM/yyyy', new Date())
        : addDays(new Date(),1);
    const defaultEndDate = searchParams.get('endDate')
        ? parse(searchParams.get('endDate') as string, 'dd/MM/yyyy', new Date())
        : addDays(defaultStartDate, 4);

    useEffect(() => {
        console.log('endDate:', searchParams.get('endDate'));
    }, [hotel]);

    const formik = useFormik({
        initialValues: {
            startDate: defaultStartDate,
            endDate: defaultEndDate,
            travelers: defaultTravelers,
            rooms: defaultRooms,
        },
        onSubmit: (values) => {
            if (values.travelers > hotel.capacity) {
                setCapacityError(`The number of travelers cannot exceed ${hotel.capacity}.`);
            } else {
                setCapacityError(null);
                // Handle booking logic here

                // console.log('Booking details:', values);
                const queries = `?travelers=${values.travelers}&`+
                    `rooms=${values.rooms}&`+
                    `startDate=${format(values.startDate, 'dd/MM/yyyy')}&`+
                    `endDate=${format(values.endDate, 'dd/MM/yyyy')}&`
                // console.log('queries:', queries);
                navigate(`/confirm-booking/${hotel._id}${queries}`)
            }
        },
    });

    const { values, handleChange, handleSubmit, setFieldValue } = formik;

    const handleStartDateChange = (date: Date | null) => {
        console.log('startDate', date);
        setFieldValue('startDate', date);
        setFieldValue('endDate', addDays(date as Date, 4));
    };

    const handleEndDateChange = (date: Date | null) => {
        console.log(date)
        setFieldValue('endDate', date);
    };

    const calculateTotalPrice = () => {
        const nights = differenceInDays(values.endDate, values.startDate) + 1;
        return nights * hotel.price;
    };

    return (
        <div className="hotel-about">
            {hotel ?
                <>
                    <div className="hotel-info">
                        <h1>{hotel.title}</h1>
                        <p>{hotel.resume}</p>
                        {hotel.host && (
                            <section className="host-wrapper">
                                <div className="host-avatar">
                                    {hotel.host.firstName[0]}
                                </div>
                                <div className="host-info">
                                    <p className="host-name">{hotel.host.firstName} {hotel.host.lastName}</p>
                                    <p className="host-role">Owner</p> {/* Optional role */}
                                </div>
                            </section>
                        )}
                        {/* Add more hotel details here */}
                        <ul>
                            {/* You can map through services if it's an array */}
                            {hotel.services?.map(service => (
                                <li key={service._id}>{service.name}</li>
                            ))}
                        </ul>
                        <br/>
                        <div className="event-wrapper">
                            <Events explorePlaceId={hotel.city?._id || ''}/>
                        </div>
                    </div>
                    <div className="booking-form">
                        <div className="price">
                            <h2>${hotel.price} per night</h2>
                            <button className="reviews-modal" onClick={openReviewsModal}>Comments</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="dates">
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <DatePicker
                                        selected={values.startDate}
                                        selectsStart
                                        startDate={values.startDate}
                                        endDate={values.endDate}
                                        onChange={handleStartDateChange}
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={<input value={values.startDate} className="form-control date-input" />}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <DatePicker
                                        selected={values.endDate}
                                        onChange={handleEndDateChange}
                                        selectsEnd
                                        startDate={values.startDate}
                                        endDate={values.endDate}
                                        minDate={values.startDate}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={<input value={values.endDate} className="form-control date-input" />}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Number of Travelers</label>
                                <select name="travelers" className="form-control" onChange={handleChange} value={values.travelers}>
                                    {[...Array(hotel.capacity)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1} {'traveler'+(index + 1 === 1 ? "" : "s")}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Number of Travelers</label>
                                <select name="rooms" className="form-control" onChange={handleChange} value={values.rooms}>
                                    {[...Array(hotel.rooms)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1} {'room'+(index + 1 === 1 ? "" : "s")}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {capacityError && <p className="error-message">{capacityError}</p>}

                            <div className="total">
                                <div className="total-Nights">
                                    <p>{differenceInDays(values.endDate, values.startDate) + 1} nights</p>
                                </div>
                                <div className="total-price">
                                    <p>Total Price: ${calculateTotalPrice()}</p>
                                </div>
                            </div>

                            <button type="submit" className="book-btn">Booking</button>
                        </form>
                    </div>
                </>
                :
                <h2>Loading</h2>
            }
            {
                hotel?._id &&
                <ReviewsModal isOpen={isReviewsModalOpen} onClose={closeReviewsModal} hotelId={hotel._id} />
            }
        </div>
    );
};

export default HotelAbout;
