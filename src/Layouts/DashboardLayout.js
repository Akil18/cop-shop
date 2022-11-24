import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {

    const menuItems = <>
        <li><Link>Item 1</Link></li>
    </>

    return (
        <div>
            <Navbar></Navbar>
            <div className="navbar justify-center bg-base-100">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;