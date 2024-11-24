import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './continue-payment-form.style.scss';
import {replaceSpace} from "../../../../../utils/string-manipulation.ts";
import {strings} from "../../../../../i18n/strings.ts";

interface PaymentFormProps {
    clientSecret: string;
    totalPrice: number;
    isDateChanged: boolean;
    isProcessing: boolean;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentError: React.Dispatch<React.SetStateAction<string | null>>;
    paymentError: string | null;
    reservationId: string;
    selectedDate: Date;
    updateReservation: (date: Date, price: number) => Promise<void>;
}

const ContinuePaymentFormScreen: React.FC<PaymentFormProps> = ({
                                                     clientSecret,
                                                     totalPrice,
                                                     isDateChanged,
                                                     isProcessing,
                                                     setIsProcessing,
                                                     setPaymentError,
                                                     paymentError,
                                                     reservationId,
                                                     selectedDate,
                                                     updateReservation,
                                                 }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handlePaymentSubmit = async () => {
        if (!stripe || !elements) {
            setPaymentError('Please provide valid payment information.');
            return;
        }

        try {
            setIsProcessing(true);
            setPaymentError(null);

            await updateReservation(selectedDate, totalPrice);

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/${replaceSpace(strings.navbar.traveler.reservations)}`,
                },
            });

            if (error) {
                setPaymentError(error.message || 'An error occurred during payment.');
            } else {
                navigate(`/${replaceSpace(strings.navbar.traveler.reservations)}`);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-form">
            <PaymentElement />
            {paymentError && <div className="payment-error">{paymentError}</div>}
            <div className="screen-buttons">
                <button
                    className="primary-button"
                    onClick={handlePaymentSubmit}
                    disabled={!isDateChanged || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay'}
                </button>
                <button className="secondary-button" onClick={() => navigate(`/${replaceSpace(strings.navbar.traveler.reservations)}`)}>Cancel</button>
            </div>
        </div>
    );
};

export default ContinuePaymentFormScreen;
