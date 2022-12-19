import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';

const ContactForm = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_4fy3whd', 'template_kieil2z', form.current, '-K6XjecLBcc43kauJ')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        toast.success('Thank you for subscribing!');
        e.target.reset();
    };

    return (
        <div className='bg-secondary py-20 grid justify-center'>
            <h2 className='text-3xl font-bold text-center mb-8 text-dark'>SUBSCRIBE TO OUR NEWSLETTER!</h2>
            <p className='text-base-100 pl-14 mb-6 font-bold'>
                Get notified about our latest products and offers
            </p>
            <form ref={form} onSubmit={sendEmail} className='pl-8'> 
                <input type="email" name="user-email" placeholder="Put your email here" className="input w-full max-w-xs mr-2 rounded-none" />
                <input type="submit" className="btn bg-blue-900 rounded-none text-base-100 border-0" value="Submit" />
            </form>
        </div>
    );
};

export default ContactForm;