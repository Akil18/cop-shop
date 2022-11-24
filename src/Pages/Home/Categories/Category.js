import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({category}) => {
    return (
        <Link to={`/products/${category._id}`}>
            <div className="card h-80 shadow-xl hover:shadow-2xl image-full">
                <figure><img className='h-fit w-full' src={category.image} alt="Shoes" /></figure>
                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title text-7xl">{category.category}</h2>
                </div>
            </div>
        </Link>
    );
};

export default Category;