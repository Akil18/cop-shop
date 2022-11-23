import React from 'react';

const Category = ({category}) => {
    return (
        <div className="card h-80 shadow-xl image-full">
            <figure><img className='h-fit w-full' src={category.image} alt="Shoes" /></figure>
            <div className="card-body flex justify-center items-center">
                <h2 className="card-title text-7xl">{category.category}</h2>
            </div>
        </div>
    );
};

export default Category;