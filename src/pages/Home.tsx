import React from 'react';
import HeroSection from './HeroSection';
import MarqueeSection from './MarqueeSection'; // NEW
import GallerySection from './GallerySection'; // (Schemes)
// NEW
import CTASection from './CTASection';
import AboutSection from '../components/AboutSection';
import TechSection from '../components/TechSection';
import FAQSection from '../components/FAQSection';
import InfoSection from '../components/InfoSection';

const Home = () => {
  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white overflow-x-hidden">
        
        {/* HERO */}
        <div id="home">
            <HeroSection/>
        </div>
        {/* TRAINING / CAPACITY BUILDING */}
        

        {/* IMPACT STRIP */}
        <MarqueeSection />
        <div id="tech">
            <TechSection/>
        </div>

        <InfoSection/>

        {/* ABOUT / INFRASTRUCTURE */}
        <div id="about">
            <AboutSection/>
        </div>

        {/* SCHEMES (Horizontal Scroll) */}
        <div id="schemes">
            <GallerySection />
        </div>

        <FAQSection/>

        {/* CORE TECHNOLOGY */}
        

        

        {/* CONTACT CALL TO ACTION */}
        <CTASection />

        {/* FOOTER */}
        <div id="contact">
            
        </div>
        
    </div>
  );
};

export default Home;