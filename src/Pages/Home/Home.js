import React from 'react';
import Banner from './Banner';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div className='lg:mx-20'>
            <Banner></Banner>
            <Categories></Categories>
        </div>
    );
};

export default Home;