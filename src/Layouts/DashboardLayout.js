import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    const menuItems = <>
        {
            isAdmin && 
            <>
                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                <li><Link to='/dashboard/reporteditems'>Reported Items</Link></li>
            </>
        }
        {
            isSeller &&
            <>
                <li><Link to='/dashboard/addproduct'>Add a Product</Link></li>
                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
            </>
        }
        {
            isBuyer && 
            <>
                <li><Link to='/dashboard/myorders'>My Orders</Link></li>
            </>
        }
    </>

    return (
        <div>
            <Navbar></Navbar>
            <div className="navbar bg-base-100 px-20">
                <div className='flex-none justify-center w-full bg-primary text-base-100'>
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
                </div>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;