// src/ui/features/hotel/components/search-hotel/search-hotel.component.tsx
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './payment-form.style.scss';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { IHotel } from "../../../../../../data/hotel/hotel.data.ts";
import { differenceInDays } from "date-fns";
import api from "../../../../../../utils/api.ts";

interface IQueries {
    startDate: Date;
    endDate: Date;
    travelers: number;
    rooms: number;
}

interface PaymentFormProps {
    queries: IQueries;
    hotel: IHotel;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ queries, hotel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    useEffect(() => {
        // Check for the completion of PaymentElement
        if (elements) {
            const paymentElement = elements.getElement(PaymentElement);
            if (paymentElement) {
                (paymentElement as any).on('change', (event : any) => {
                    setIsFormComplete(event.complete);
                    setPaymentError(event.error ? event.error.message : null); // Capture any payment errors
                });
            }
        }
    }, [elements]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsProcessing(true);
        setPaymentError(null); // Reset error on new submission

        if (!stripe || !elements) {
            setIsProcessing(false);
            return;
        }
        else {


            const nights = differenceInDays(queries.endDate, queries.startDate) + 1;
            const formQueries = {
                ...queries,
                // startDate: format(queries.startDate, 'dd/MM/yyyy'),
                // endDate: format(queries.endDate, 'dd/MM/yyyy'),
                totalPrice: hotel.price * nights,
                hotel: hotel._id
            };
            console.log(formQueries);
            api.post("/hotel-bookings", formQueries).then(response => {
                console.log(response.data);
                setIsFormComplete(false); // Show success message
            })

            // Simulate payment processing
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/`
                }
            });

            if (error) {
                setPaymentError(error.message as string); // Display payment error
            } else {
                // Handle success
                console.log("Payment successful!");
            }

            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-form-section">
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="elements">
                    <PaymentElement />
                    {paymentError && <div className="payment-error">{paymentError}</div>} {/* Display payment error */}
                </div>
                <div className="submit-button">
                    <button id="submit" disabled={!isFormComplete || isProcessing}>
                        <span id="button-text" className="primary-button">
                            {isProcessing ? 'Processing...' : 'Confirm Payment'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
