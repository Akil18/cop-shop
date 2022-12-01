import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';

const MyProducts = () => {
    const {user} = useContext(AuthContext);

    const {data: products = [], refetch, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/products?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleAdvertise = id => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }

    return (
        <div className='min-h-screen'>
            <h2 className='text-3xl text-center font-semibold my-8'>My products</h2>

            <div className="overflow-x-auto mx-20 mb-20">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, idx) => 
                                <tr key={product._id}>
                                    <th>{idx+1}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        {
                                            product?.sold ?
                                            <p className='text-red-600 font-bold'>Sold</p>
                                            :
                                            <p className='text-green-600 font-bold'>Available</p>
                                        }
                                    </td>
                                    <td>
                                        {
                                            product?.advertise !== true && 
                                            <button onClick={() => handleAdvertise(product._id)} className='btn btn-xs btn-primary'>Advertise</button> 
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

export default MyProducts;