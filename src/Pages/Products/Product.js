import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const Product = ({product, setSelectedProduct}) => {
    const {user} = useContext(AuthContext);
    const {picture, productName, location, price, originalPrice, yearsOfUse, postDate, sellerName, email} = product;
    const [isSellerVerified, setIsSellerVerified] = useState(false);
    const navigate = useNavigate();

    const handleBookNow = () => {
        if(user?.uid){
            setSelectedProduct(product);
        }
        else{
            toast('Please login to book items', {duration: 5000});
            navigate('/login');
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSellerVerified(data.verifiedUser);
            });
    }, [email]);

    const handleReportToAdmin = (id) => {
        fetch(`http://localhost:5000/reportItem/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            toast('Item has been Reported');
        });
    };

    return (
        <>
            {
                !product?.sold &&
                <div className="card bg-base-100 shadow-xl ">
                    <figure className='max-h-64'><img src={picture} alt={productName} /></figure>
                    <div className='flex justify-end pt-4 pr-4'>
                        <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                        </label>
                        <div tabIndex={0} className="card compact dropdown-content shadow bg-base-100 rounded-box w-64">
                            <div className="card-body">
                                <button onClick={() => handleReportToAdmin(product?._id)} className='btn bg-red-600'>Report</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{productName}</h2>
                        <p>location: {location}</p>
                        <p><strong>Resale Price: {price}</strong></p>
                        <p>Original Price: {originalPrice}</p>
                        <p>Years of Use: {yearsOfUse}</p>
                        <p>Date Posted: {postDate}</p>
                        <p className='flex'>
                            <span>Seller Name: {sellerName}</span>
                            {
                                isSellerVerified && <FaCheckCircle className='text-blue-800 ml-1' />
                            }
                        </p>
                        <div className="card-actions justify-center">
                        <label 
                            onClick={handleBookNow} 
                            htmlFor="booking-modal"
                            className="btn btn-primary w-full text-base-100">
                                Book Now
                        </label>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Product;