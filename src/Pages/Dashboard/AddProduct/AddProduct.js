import { format } from 'date-fns/esm';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AddProduct = () => {
    const {user} = useContext(AuthContext);    
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const postDate = format(new Date(), 'dd/MM/yyyy');
        const email = user.email;
        const sellerName = user.displayName;
        const productName = data.productName;
        const category = data.category;
        const originalPrice = data.originalPrice;
        const price = data.price;
        const picture = data.photoUrl;
        const condition = data.condition;
        const mobile = data.mobile;
        const location = data.location;
        const description = data.description;
        const yearOfPurchase = data.yearOfPurchase;
        const yearsOfUse = data.yearsOfUse;

        const product = {
            postDate,
            email,
            sellerName,
            productName,
            category,
            originalPrice,
            price,
            picture,
            condition,
            mobile,
            location,
            description,
            yearOfPurchase,
            yearsOfUse
        }
        console.log(product);

        fetch('https://used-products-resale-market-server-side.vercel.app/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Product Added Successfully');
                navigate('/dashboard/myproducts');
            }
        })

    }

    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-8'>Add a new product</h2>

            <form className='border-2 border-secondary mx-96 mb-8 px-24 py-4' onSubmit={handleSubmit(onSubmit)}>
                
                <label className="label"><span className="label-text">Product Name</span></label>
                <input {...register("productName")} type="text" className="input input-bordered w-full" />
                
                <label className="label"><span className="label-text">Category</span></label>
                <select {...register("category")} className="select select-bordered w-full">
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Shoes">Shoes</option>
                </select>

                <label className="label"><span className="label-text">Original Price</span></label>
                <input {...register("originalPrice")} type="text" className="input input-bordered w-full" />

                <label className="label"><span className="label-text">Price</span></label>
                <input {...register("price")} type="number" className="input input-bordered w-full" />

                <label className="label"><span className="label-text">Photo URL</span></label>
                <input {...register("photoUrl")} type="text" className="input input-bordered w-full" />
                
                <label className="label"><span className="label-text">Condition</span></label>
                <select {...register("condition")} className="select select-bordered w-full">
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                </select>

                <label className="label"><span className="label-text">Mobile Number</span></label>
                <input {...register("mobile")} type="text" className="input input-bordered w-full" />

                <label className="label"><span className="label-text">Location</span></label>
                <input {...register("location")} type="text" className="input input-bordered w-full" />
                
                <label className="label"><span className="label-text">Description</span></label>
                <textarea {...register("description")} className="textarea h-24 textarea-bordered w-full"></textarea>

                <label className="label"><span className="label-text">Year of Purchase</span></label>
                <input {...register("yearOfPurchase")} type="text" className="input input-bordered w-full" />

                <label className="label"><span className="label-text">Years of Use</span></label>
                <input {...register("yearsOfUse")} type="text" className="input input-bordered w-full" />
                
                <div className='flex justify-center mt-4'>
                    <input type="submit" className="btn btn-accent text-base-100 w-full" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;