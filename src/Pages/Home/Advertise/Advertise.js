import React from 'react';


const Advertise = ({products}) => {

    return (
        <section className='my-32'>
            <h2 className='text-3xl font-bold text-center mb-10 text-secondary'>ADVERTISED PRODUCTS</h2>
            <div className='carousel carousel-end rounded-box h-96'>
                {
                    products.map((product) => <div
                        key={product._id}
                        className='carousel-item p-4'
                    >
                        <img src={product?.picture} alt={product?.productName} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Advertise;