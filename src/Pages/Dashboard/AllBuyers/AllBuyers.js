import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';

const AllBuyers = () => {

    const {data: users = [], refetch, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/buyers');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/admin/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                refetch();
            }
        })
    }

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl text-center font-semibold my-8'>All Buyers</h2>

            <div className="overflow-x-auto mx-20 mb-20">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
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
                                    <td>{user?.role}</td>
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

export default AllBuyers;