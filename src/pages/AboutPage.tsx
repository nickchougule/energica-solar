// src/pages/AboutPage.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CompanyOverview from '../components/About/CompanyOverview';
import MissionVision from '../components/About/MissionVision';
import LeadershipTeam from '../components/About/LeadershipTeam';
import OurImpact from '../components/About/OurImpact';
import OngoingProjectsMap from '../components/About/OngoingProjectsMap';
import InfrastructureSection from '../components/About/InfrastructureSection';
import CSRSection from '../components/About/CSRSection';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // RESTORED YOUR ORIGINAL ANIMATION
            // This ensures content is visible immediately if JS lags, avoiding the blank screen
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.5,
                ease: "power4.out",
                // Added this to fix layout shifts on child components
                onComplete: () => ScrollTrigger.refresh() 
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        // No 'invisible' class here - ensures content is rendered
        <div ref={containerRef} className="bg-[#0b0b0b] text-white min-h-screen pt-20">
            
            <section id="company-overview">
                <CompanyOverview/>
            </section>
            
            <section id="mission-vision">
                <MissionVision/>
            </section>
            
            <section id="leadership">
                <LeadershipTeam/>
            </section>
            
            <section id="impact">
                <OurImpact/>
            </section>
            
            <section id="projects">
                <OngoingProjectsMap/>
            </section>
            
            <section id="infrastructure">
                <InfrastructureSection/>
            </section>
            
            <section id="csr">
                <CSRSection/>
            </section>

        </div>
    );
};

export default AboutPage;