import React from 'react';
import Product from '../../Products/Product';

const Advertise = ({products}) => {
    
    return (
        <section className='my-32'>
            <h2 className='text-3xl font-bold text-center mb-10 text-secondary'>Advertised Products</h2>
            <div className='grid items-center gap-4 lg:grid-cols-3'>
                {
                    products.map((product, idx) => <Product 
                            key={idx} 
                            product={product}
                        ></Product>)
                }
            </div>
        </section>
    );
};

export default Advertise;