import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="navbar bg-neutral lg:px-20">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link>Item 1</Link></li>
                    <li><Link>Item 3</Link></li>
                </ul>
                </div>
                <Link to='/' className="text-primary font-semibold text-xl rounded-xl hover:bg-gray-100">Cop <span className='text-secondary'>Shop</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                <li><Link to='/blogs'>Blogs</Link></li>
                <li><Link>Item 3</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.uid ?
                    <button onClick={handleLogout} className='btn btn-secondary'>LogOut</button>
                    :
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;