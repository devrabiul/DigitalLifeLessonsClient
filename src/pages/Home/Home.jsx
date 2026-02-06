import React from 'react';
import HeroSlides from './partials/HeroSlides';
import StatsSection from './partials/StatsSection';
import FeaturedLifeLessons from './partials/FeaturedLifeLessons';

const Home = () => {
    return (
        <div>
            <HeroSlides />  
            <StatsSection />  
            <FeaturedLifeLessons />  
        </div>
    );
};

export default Home;