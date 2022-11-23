import React from 'react';
import banner from '../../Assets/banner.png';

const Banner = () => {
    return (
        <div>
            <div className="hero">
                <img src={banner} alt="banner" />
            </div>
        </div>
    );
};

export default Banner;