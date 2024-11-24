import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { IHotelReservation } from '../../../../data/hotel/hotel-reservations.data.ts';
import api from '../../../../utils/api.ts';
import './continue-reservation.style.scss';
import { showHotelReservation } from '../../../../data/hotel/hotel-reservations.data.ts';
import { addDays, differenceInDays } from 'date-fns';
import { createPaymentIntent, getPublishableKey } from "../../../../data/hotel/booking-hotel.data.ts";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import ContinuePaymentFormScreen from "./continue-payment-form/continue-payment-form.screen.tsx";


const ContinueReservationScreen: React.FC = () => {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState<IHotelReservation>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isDateChanged, setIsDateChanged] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        if (reservationId) {
            showHotelReservation(reservationId).then(response => {
                setReservation(response.data);
                setSelectedDate(new Date(response.data?.checkOut));
            });
        }
    }, [reservationId]);

    useEffect(() => {
        const fetchStripeDetails = async () => {
            const publishableKey = (await getPublishableKey()).data.publishableKey;
            setStripePromise(loadStripe(publishableKey));
            const fetchedClientSecret = (await createPaymentIntent(totalPrice)).data.clientSecret;
            setClientSecret(fetchedClientSecret);
        };
        fetchStripeDetails();
    }, [totalPrice]);

    useEffect(() => {
        if (selectedDate && reservation?.checkOut) {
            const checkOutDate = new Date(reservation.checkOut);
            const daysDifference = differenceInDays(selectedDate, checkOutDate);

            const calculatedPrice = reservation.hotel.price * daysDifference;
            setTotalPrice(calculatedPrice > 0 ? calculatedPrice : 0);
            setIsDateChanged(daysDifference > 0);
        }
    }, [selectedDate, reservation]);

    const updateReservation = async (date: Date, price: number) => {
        reservation && await api.put(`/hotel-reservations/${reservationId}`, {
            checkOut: date,
            totalPrice: reservation?.totalPrice + price,
        });
    };

    // if (!clientSecret || !stripePromise) return <div>Loading...</div>;

    return (
        <div className="continue-reservation-screen">
            <h2 className="screen-title">Continue Your Reservation</h2>
            <div className="form-group-reservation">
                <label htmlFor="reservation-date">Select Date:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => setSelectedDate(date)}
                    minDate={addDays(new Date(reservation?.checkOut), reservation?.hotel?.minDays)}
                    maxDate={addDays(new Date(reservation?.checkOut), reservation?.hotel?.maxDays)}
                    selectsEnd
                    startDate={new Date(reservation?.checkOut)}
                    dateFormat="dd/MM/yyyy"
                    id="reservation-date"
                    customInput={<input className="form-control date-input" />}
                />
            </div>
            <div className="price-display">
                <p>Total Price for Extension: <strong>{totalPrice} USD</strong></p>
            </div>
            <div className="payment-element">
                {
                    reservation && totalPrice && clientSecret && stripePromise &&
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <ContinuePaymentFormScreen
                            clientSecret={clientSecret}
                            totalPrice={totalPrice}
                            isDateChanged={isDateChanged}
                            isProcessing={isProcessing}
                            setIsProcessing={setIsProcessing}
                            setPaymentError={setPaymentError}
                            paymentError={paymentError}
                            reservationId={reservationId || ""}
                            selectedDate={selectedDate || new Date()}
                            updateReservation={updateReservation}
                        />
                    </Elements>
                }

            </div>
        </div>
    );
};

export default ContinueReservationScreen;
