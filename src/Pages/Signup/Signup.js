import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/useToken';

const Signup = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {createUser} = useContext(AuthContext);   
    const [signUpError, setSignUpError] = useState('');
    const [seller, setSeller] = useState(false);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if(token){
        navigate('/');
    }

    const handleSignUp = (data) => {
        console.log(data);
        let role = 'buyer';
        if(data.sellerAccount === 'on'){
            role = 'seller';
        }
        console.log(role);
        setSignUpError('');
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                saveUser(data.name, data.email, role);
            })
            .catch(err => {
                console.log(err);
                setSignUpError(err.message);
            });
    }

    const saveUser = (name, email, role) => {
        const user = {
            name: name,
            email: email,
            role: role
        }
        
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCreatedUserEmail(email);
        })

    }

    const handleChecked = () => {
        setSeller(!seller);
    }

    return (
        <div className='h-[540px] flex justify-center items-center'>
            <div className='w-96 p-8'>
                
                <h2 className='text-2xl text-center font-semibold'>Sign Up</h2>
                
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", {
                            required: "Name is required"
                            })} type="text" className="input input-bordered w-full"/>
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    
                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {
                            required: "Email Address is required"
                            })} type="email" className="input input-bordered w-full"/>
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", 
                                    {
                                        required: "Password is required", 
                                        minLength: {value: 6, message: "Password must be atleast 6 characters"},
                                        pattern: {value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]){6,}/, message: "Password must contain atleast one uppercase letter, one number and one symbol"}
                                    })
                                } 
                        type="password" className="input input-bordered w-full"/>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                    <div className="form-control mt-4">
                        <label className="label justify-start">
                            <input {...register("sellerAccount")} type="radio" className="radio radio-secondary" onClick={handleChecked} checked={seller} />
                            <span className="label-text ml-4 font-semibold">Create Seller Account</span>
                        </label>
                    </div>
                
                    <input type="submit" value="Sign Up" className="btn btn-accent my-4 text-base-100 w-full" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                
                <p>Already have an account? <Link to='/login' className='text-secondary'>Please Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;