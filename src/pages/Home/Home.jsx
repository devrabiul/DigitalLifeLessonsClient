import React from 'react';
import HeroSlides from './partials/HeroSlides';
import StatsSection from './partials/StatsSection';
import FeaturedLifeLessons from './partials/FeaturedLifeLessons';
import WhyLearning from './partials/WhyLearning';
import TopContributorsAndMostSaved from './partials/TopContributorsAndMostSaved';

const Home = () => {
    return (
        <div>
            <HeroSlides />  
            <StatsSection />  
            <FeaturedLifeLessons />  
            <WhyLearning /> 
            <TopContributorsAndMostSaved /> 
        </div>
    );
};

export default Home;