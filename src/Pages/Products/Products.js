import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../../Components/BookingModal';
import Loading from '../../Shared/Loading/Loading';
import Product from './Product';

const Products = () => {
    // const [categorisedProducts, setCategorisedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const category = useLoaderData();

    const {data:categorisedProducts = [], refetch, isLoading} = useQuery({
        queryKey: ['categorisedProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${category._id}`);
            const data = await res.json();
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <section>
            <div>
                <h2 className='text-6xl text-center font-semibold mt-20'>{category.category}</h2>
                <div className='grid gap-6 m-20 lg:grid-cols-3'>
                {
                    categorisedProducts.map(product => <Product
                        key={product._id}
                        setSelectedProduct={setSelectedProduct}
                        product={product}
                    ></Product>) 
                }
                </div>
            </div>
            {
                selectedProduct && <BookingModal
                    setSelectedProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default Products;