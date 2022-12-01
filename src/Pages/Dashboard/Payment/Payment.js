import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

console.log(stripePromise);

const Payment = () => {
    const order = useLoaderData();

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl ml-20 font-semibold my-20'>Payment: {order.title}</h2>
        
            <div className='w-96 ml-20 mt-8 border-2 p-8'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;