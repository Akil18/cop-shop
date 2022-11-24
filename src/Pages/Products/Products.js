import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const Products = () => {
    const [categorisedProducts, setCategorisedProducts] = useState([]);
    const category = useLoaderData();

    console.log(category);

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${category._id}`)
            .then(res => {
                const data = res.data;
                setCategorisedProducts(data)
            })
    }, [category._id]);

    console.log(categorisedProducts);
    return (
        <div>
            <h2 className='text-6xl text-center font-semibold mt-20'>{category.category}</h2>
            <div className='grid gap-6 m-20 lg:grid-cols-3'>
            {
                categorisedProducts.map(product => <Product
                    key={product._id}
                    product={product}
                ></Product>) 
            }
            </div>
        </div>
    );
};

export default Products;