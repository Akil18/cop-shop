import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {signIn} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
            })
            .catch(err => {
                console.log(err);
                setLoginError(err.message);
            });
    }

    const handleGoogleLogin = () => {
        console.log('Google Login');
    }
    
    return (
        <div className='h-[540px] flex justify-center items-center'>
            <div className='w-96 p-8'>
                
                <h2 className='text-2xl text-center font-semibold'>Login</h2>
                
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {required: "Email Address is required"})} type="email" className="input input-bordered w-full"/>
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    
                    <div className="form-control max-w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", 
                                    {
                                        required: "Password is required", 
                                        minLength: {value: 6, message: "Password must be atleast 6 characters"}
                                    })
                                } 
                        type="password" className="input input-bordered w-full"/>
                        <label className="label"><span className="label-text-alt">Forgot Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                        
                        <input type="submit" className="btn btn-accent my-4 text-base-100 w-full" />
                        {
                            loginError && <p className='text-red-600'>{loginError}</p>
                        }
                </form>
                
                    <p>New to Doctor's Portal? <Link to='/signup' className='text-secondary'>Create an Account</Link></p>
                    <div className='divider'>OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full mt-4'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;