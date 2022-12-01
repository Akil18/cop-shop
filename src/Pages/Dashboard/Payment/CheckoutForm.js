import React, { useEffect, useState } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CheckoutForm = ({order}) => {
    const [paymentError, setPaymentError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const {price, buyerEmail} = order;

    useEffect(() => {
        fetch('https://used-products-resale-market-server-side.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => {
            setClientSecret(data.clientSecret);
        })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            console.log(error);
            setPaymentError(error.message);
        } else {
            setPaymentError('');
        }

        setSuccess('');
        setProcessing(true);

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret, 
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: buyerEmail
                        },    
                    },
                },
            );
                
        if(confirmError){
            setPaymentError(confirmError.message);
            return;
        }

        if(paymentIntent.status === 'succeeded'){
            console.log('card info', card);
            const payment = {
                price,
                email: buyerEmail,
                orderId: order._id,
                productId: order.productId,
                paymentId: paymentIntent.id,
            }
            
            fetch('https://used-products-resale-market-server-side.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    setSuccess('Payment Successful');
                    setTransactionId(paymentIntent.id);
                }
            }
            )
        }

        setProcessing(false);

        console.log(paymentIntent);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                <button className='btn btn-primary mt-4 w-36' type="submit" 
                disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='mt-4 text-red-600'>{paymentError}</p>
            {
                success && 
                <>
                    <p className='mt-4 text-green-600'>{success}</p>
                    <p className='mt-4 text-green-600'>Transaction ID: {transactionId}</p>
                </>

            }
        </>
    );
};

export default CheckoutForm;