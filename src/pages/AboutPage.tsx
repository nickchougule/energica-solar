import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import CompanyOverview from '../components/About/CompanyOverview';
import MissionVision from '../components/About/MissionVision';
import LeadershipTeam from '../components/About/LeadershipTeam';
import OurImpact from '../components/About/OurImpact';
import OngoingProjectsMap from '../components/About/OngoingProjectsMap';
import InfrastructureSection from '../components/About/InfrastructureSection';
import CSRSection from '../components/About/CSRSection';

// Component Imports (to be created below)

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Page Transition Animation: Fade and Slide Up on Load
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1.5,
                ease: "power4.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0b0b0b] text-white min-h-screen pt-20">
            
            {/* --- CORE CONTENT SECTIONS --- */}
            
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