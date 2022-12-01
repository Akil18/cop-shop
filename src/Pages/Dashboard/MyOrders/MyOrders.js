import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const MyOrders = () => {
    const {user} = useContext(AuthContext);

    const {data: orders = [], refetch, isLoading} = useQuery({
        queryKey: ['orders'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/orders/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handlePayment = id => {
        console.log(id);
    }

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl text-center font-semibold my-8'>My Orders</h2>

            <div className="overflow-x-auto mx-20 mb-20">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, idx) => 
                                <tr key={order?._id}>
                                    <th>{idx+1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={order?.image} alt={order?.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order?.title}</td>
                                    <td>{order?.price}</td>
                                    <td>
                                        {
                                            order?.paid ?
                                            <p className='text-green-600 font-bold'>Paid</p>
                                            : 
                                            <Link to={`/dashboard/payment/${order?._id}`}>
                                            <button onClick={() => handlePayment(order._id)} className='btn btn-xs bg-green-300 text-base-100'>Pay</button>
                                            </Link> 
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;