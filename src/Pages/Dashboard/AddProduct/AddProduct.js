import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div>
            <h2 className='text-3xl text-center font-semibold my-8'>Add a new product</h2>

            <form className='border-2 border-secondary mx-96 mb-8 px-24 py-4' onSubmit={handleSubmit(onSubmit)}>
                
                <label className="label"><span className="label-text">Product Name</span></label>
                <input {...register("productName")} type="text" className="input input-bordered w-full" />
                
                <label className="label"><span className="label-text">Price</span></label>
                <input {...register("price")} type="text" className="input input-bordered w-full" />
                
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
                
                <div className='flex justify-center mt-4'>
                    <input type="submit" className="btn btn-accent text-base-100 w-full" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;