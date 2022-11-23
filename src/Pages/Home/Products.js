import React from 'react';

const Products = () => {
    return (
        <section className='my-32'>
            <h2 className='text-3xl font-bold text-center mb-10 text-secondary'>SHOP BY CATEGORY</h2>
            <div className='grid items-center gap-4 lg:grid-cols-3'>
            <div className="card h-80 shadow-xl image-full">
                <figure><img className='h-fit w-full' src="https://i.ibb.co/nmsRzPN/tops.jpg" alt="Shoes" /></figure>
                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title text-7xl">Tops</h2>
                </div>
            </div>
            {/* <div className="card h-80 shadow-xl image-full">
                <figure><img className='h-fit w-full' src="https://i.ibb.co/9swLXKZ/bottoms.jpg" alt="Shoes" /></figure>
                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title text-7xl">Bottoms</h2>
                </div>
            </div>
            <div className="card h-80 shadow-xl image-full">
                <figure><img className='h-fit w-full' src="https://i.ibb.co/H4qSvcq/shoes.jpg" alt="Shoes" /></figure>
                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title text-7xl">Shoes</h2>
                </div>
            </div> */}
        </div>
        </section>
    );
};

export default Products;