import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Advertise from './Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories/Categories';

const Home = () => {

    const {data: products = []} = useQuery({
        queryKey: ['products'],
        queryFn: async() => {
            const res = await fetch('http://localhost:5000/advertisedproducts');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='lg:mx-20'>
            <Banner></Banner>
            <Categories></Categories>
            <Advertise products={products}></Advertise>
        </div>
    );
};

export default Home;