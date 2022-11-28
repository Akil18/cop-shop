import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({selectedProduct, setSelectedProduct, refetch}) => {
    const {user} = useContext(AuthContext);
    const {productName, price, picture} = selectedProduct;

    console.log('inside modal',selectedProduct);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const phone = form.phone.value;
        const meetingLocation = form.meetingLocation.value;

        const booking = {
            buyerEmail: user?.email,
            title: productName,
            image: picture,
            price,
            phone,
            meetingLocation
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                form.reset();
                setSelectedProduct(null);
                toast.success('Booking Confirmed');
                refetch();
            }
            else{
                toast.error(data.message);
            }
            
        })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-accent text-base-100">✕</label>
                    <h3 className="text-lg font-bold text-center py-2">Booking</h3>
                    <form onSubmit={handleBooking} className='grid gap-2'>
                        <input type="text" value={user?.displayName} className="input max-w-full" disabled />
                        <input type="text" value={user?.email} className="input max-w-full" disabled />
                        <input type="text" value={productName} className="input max-w-full" disabled />
                        <input type="text" value={price} className="input max-w-full" disabled />
                        <input  name='phone' type="text" placeholder="Phone Number" className="input input-bordered max-w-full" />
                        <input  name='meetingLocation' type="text" placeholder="Meeting Location" className="input input-bordered max-w-full" />
                        <input type="submit" value="Submit" className="btn btn-secondary text-base-100 max-w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;