import React from 'react';

const BookingModal = ({selectedProduct}) => {
    const {productName, resalePrice} = selectedProduct;

    console.log('inside modal',selectedProduct);

    const handleBooking = event => {
        event.preventDefault();
        console.log('Booking');
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-accent text-base-100">✕</label>
                    <h3 className="text-lg font-bold text-center py-2">Booking</h3>
                    <form onSubmit={handleBooking} className='grid gap-2'>
                        <input type="text" value={productName} className="input max-w-full" disabled />
                        <input type="text" value={resalePrice} className="input max-w-full" disabled />
                        {/* <select name='slot' className="select select-bordered w-full max-w-full">
                            {
                                treatment.slots.map((slot, idx) => <option value={slot} key={idx}>{slot}</option>)
                            }
                        </select>
                        <input  name='name' type="text" defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered max-w-full" />
                        <input  name='email' type="email" defaultValue={user?.email} placeholder="Email Address" className="input input-bordered max-w-full" />
                        <input  name='phone' type="text" placeholder="Phone Number" className="input input-bordered max-w-full" /> */}
                        <input type="submit" value="Submit" className="btn btn-secondary text-base-100 max-w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;