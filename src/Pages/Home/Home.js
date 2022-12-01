import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Advertise from './Advertise/Advertise';
import Banner from './Banner';
import Categories from './Categories/Categories';

const Home = () => {

    const {data: products = [], isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async() => {
            const res = await fetch('https://used-products-resale-market-server-side.vercel.app/advertisedproducts');
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='lg:mx-20'>
            <Banner></Banner>
            <Categories></Categories>
            {
                products.length > 0 && <Advertise products={products}></Advertise>
            }
        </div>
    );
};

export default Home;