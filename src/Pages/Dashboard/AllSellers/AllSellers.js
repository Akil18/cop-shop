import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';

const AllSellers = () => {
    const {data: users = [], refetch, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/sellers');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleVerify = (id) => {
        fetch(`http://localhost:5000/admin/users/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    console.log(data);
                    refetch();
                }
        })
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/admin/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    console.log(data);
                    refetch();
                }
        })
    }

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl text-center font-semibold my-8'>All Sellers</h2>

            <div className="overflow-x-auto mx-20 mb-20">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Verify</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => 
                                <tr key={user?._id}>
                                    <th>{idx+1}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {   
                                            !user?.verifiedUser &&
                                            <button onClick={() => handleVerify(user._id)} className='btn btn-xs bg-green-600 text-base-100'>Verify Seller</button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            user && 
                                            <button onClick={() => handleDelete(user._id)} className='btn btn-xs bg-red-600 text-base-100'>Delete</button> 
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

export default AllSellers;