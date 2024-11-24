// src/ui/features/hotel-details/components/confirm-booking/confirm-booking.component.tsx
import React, { useEffect } from 'react';
import "./confirm-booking.style.scss";
import { IHotel } from "../../../../../data/hotel/hotel.data.ts";
import 'react-datepicker/dist/react-datepicker.css';
import {addDays, parse, differenceInDays, format} from 'date-fns';
import { useLocation } from "react-router-dom";
import {api_url} from "../../../../../utils/domain/back.ts";
import PaymentForm from "./payment-form/payment-form.component.tsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {createPaymentIntent, getPublishableKey} from "../../../../../data/hotel/booking-hotel.data.ts";

interface ConfirmBookingProps {
    hotel: IHotel;
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ hotel }) => {
    const [stripePromise, setStripePromise] = React.useState();
    const [clientSecret, setClientSecret] = React.useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [queries, setQueries] = React.useState({
        travelers: 1,
        rooms: 1,
        startDate: new Date(),
        endDate: addDays(new Date(), 4),
    });

    useEffect(() => {
        const defaultTravelers = parseInt(searchParams.get('travelers') as string) || 1;
        const defaultRooms = parseInt(searchParams.get('rooms') as string) || 1;
        const defaultStartDate = searchParams.get('startDate')
            ? parse(searchParams.get('startDate') as string, 'dd/MM/yyyy', new Date())
            : addDays(new Date(), 1);
        const defaultEndDate = searchParams.get('endDate')
            ? parse(searchParams.get('endDate') as string, 'dd/MM/yyyy', new Date())
            : addDays(defaultStartDate, 4);
        setQueries({
            travelers: defaultTravelers,
            rooms: defaultRooms,
            startDate: defaultStartDate,
            endDate: defaultEndDate,
        })
    }, []);

    useEffect(() => {
        getPublishableKey().then(async (result:any) => {
            const {publishableKey} = await result.data;
            // console.log(publishableKey)
            setStripePromise(loadStripe(publishableKey) as any)
        })
    }, [hotel]);

    useEffect(() => {
        createPaymentIntent(calculateTotalPrice()).then(async (result:any) => {
            const {clientSecret} = await result.data;
            // console.log('client Secret: ',clientSecret)
            // setStripePromise(loadStripe(publishableKey) as any)
            setClientSecret(clientSecret)
        })
    }, []);


    const calculateTotalPrice = () => {
        const nights = differenceInDays(queries.endDate, queries.startDate) + 1;
        return nights * hotel.price;
    };

    return (
        <div className="confirm-booking">
            {hotel ? (
                <>
                    <div className="trip-details">
                        <h2>Your Travel</h2>
                        <div className="details-item">
                            <span className="label">Dates: </span>
                            <span>{`${format(new Date(queries.startDate), 'dd/MMM')} – ${format(new Date(queries.endDate), 'dd/MMM')}`}</span>
                        </div>
                        <div className="details-item">
                            <span className="label">Travelers</span>
                            <span>{`${queries.travelers} Traveler${queries.travelers>1?'s':''}`}</span>
                        </div>
                        <div className="details-item">
                            <span className="label">Rooms</span>
                            <span>{`${queries.rooms} room${queries.rooms>1?'s':''}`}</span>
                        </div>
                        { stripePromise && hotel &&  clientSecret &&
                            <Elements stripe={stripePromise} options={{clientSecret}}>
                                <PaymentForm queries={queries} hotel={hotel}/>
                            </Elements>
                        }
                    </div>

                    <div className="price-summary">
                        <img src={`${api_url}/${hotel.principalImage.default}`} alt={hotel.title} />
                        <div className="room-header">
                            <h2 className="room-title">{hotel.title}</h2>
                            <h3 className="room-city">{hotel.city?.name}</h3>
                        </div>
                        <div className="price-breakdown">
                            <div className="price-item">
                                <span>{`$${hotel.price} x ${differenceInDays(queries.endDate, queries.startDate)+1} ${(differenceInDays(queries.endDate, queries.startDate)+1)>1?'nights':'night'}`}</span>
                                <span className="amount">${calculateTotalPrice()}</span>
                            </div>
                        </div>
                        <div className="total-price">Total: ${calculateTotalPrice()}</div>
                    </div>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );

};

export default ConfirmBooking;
