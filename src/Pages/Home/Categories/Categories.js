import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import Category from './Category';

const Products = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/categories`)
            .then(res => {
                setIsLoading(false);
                const data = res.data;
                setCategories(data)
            })
    }, []);

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <section className='my-32'>
            <h2 className='text-3xl font-bold text-center mb-10 text-secondary'>SHOP BY CATEGORY</h2>
            <div className='grid items-center gap-4 lg:grid-cols-3'>
                {
                    categories.map((category, idx) => <Category 
                            key={idx} 
                            category={category}
                        ></Category>)
                }
            </div>
        </section>
    );
};

export default Products;