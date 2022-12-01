import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';

const ReportToAdmin = () => {

    const {data: items = [], refetch, isLoading} = useQuery({
        queryKey: ['items'],
        queryFn: async() => {
            const res = await fetch('https://used-products-resale-market-server-side.vercel.app/reportedItems');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleDelete = (id) => {
        fetch(`https://used-products-resale-market-server-side.vercel.app/reportedItems/${id}`, {
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
            <h2 className='text-3xl text-center font-semibold my-8'>Reported Items</h2>

            <div className="overflow-x-auto mx-20 mb-20">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, idx) => 
                                <tr key={item?._id}>
                                    <th>{idx+1}</th>
                                    <td>{item?.productName}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.sellerName}</td>
                                    <td>
                                        {
                                            item && 
                                            <button onClick={() => handleDelete(item._id)} className='btn btn-xs bg-red-600 text-base-100'>Delete</button> 
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

export default ReportToAdmin;