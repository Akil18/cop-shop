import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';


const Product = ({product, setSelectedProduct}) => {
    const {picture, productName, location, resalePrice, originalPrice, yearsOfUse, postDate, sellerName, sellerVerified} = product;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={picture} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{productName}</h2>
                <p>location: {location}</p>
                <p><strong>Resale Price: {resalePrice}</strong></p>
                <p>Original Price: {originalPrice}</p>
                <p>Years of Use: {yearsOfUse}</p>
                <p>Date Posted: {postDate}</p>
                <p className='flex'>
                    <span>Seller Name: {sellerName}</span>
                    {
                        sellerVerified && <FaCheckCircle className='text-blue-800 ml-1' />
                    }
                </p>
                <div className="card-actions justify-center">
                <label 
                    onClick={() => setSelectedProduct(product)} 
                    htmlFor="booking-modal"
                    className="btn btn-primary w-full text-base-100">
                        Book Now
                </label>
                </div>
            </div>
        </div>
    );
};

export default Product;