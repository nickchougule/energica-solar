import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
// Make sure you have the ScrollTrigger plugin installed and registered
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CompanyOverview = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Start the animation when the top of the section hits 85% of the viewport
                    toggleActions: "play none none reverse",
                }
            });

            // 1. ANGLE: Animate the small, top tag (The Energica Story)
            tl.from(".tag-line", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            }, 0) // Start at time 0 of the timeline

            // 2. MAIN HEADLINE: Staggered slide-in from the left for a dramatic effect
            .from(".main-title-part", {
                x: -50, // Slide in from 50px to the left
                opacity: 0,
                duration: 1.2,
                stagger: 0.2, // Stagger each line/word part
                ease: "power3.out",
            }, 0.2) // Start 0.2 seconds after the timeline begins

            // 3. CONTENT COLUMNS: Animate the two content columns (Our Company & What We Do)
            // Note: The stagger is small to make them feel like they arrive simultaneously
            .from(".content-column", {
                y: 50, // Slightly higher slide-up
                opacity: 0,
                duration: 1.2,
                stagger: 0.1, 
                ease: "back.out(1.2)", // Use a "back" ease for a slight overshoot/bounce effect
            }, 0.6); // Start 0.6 seconds after the timeline begins

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto py-32 px-6 md:px-20">
            <div className="text-center mb-20">
                {/* TAG LINE */}
                <span className="tag-line text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-4">
                    The Energica Story
                </span>
                
                {/* MAIN HEADLINE - Split into parts for the staggered animation */}
                <h1 className="text-6xl md:text-8xl font-black uppercase leading-tight">
                    <span className="main-title-part block">A Foundation</span>
                    <span className="main-title-part block">of <span className="text-gray-500">Integrity.</span></span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                
                {/* OUR COMPANY COLUMN */}
                <div className="content-column border-l-2 border-[#28a745] pl-8">
                    <h3 className="text-2xl font-bold uppercase mb-4 text-white">
                        Our Company
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        At <span className="text-white font-semibold">Infravisory Consultancy Pvt. Limited (Energica)</span>, we believe in a client-centric approach, focusing on understanding the unique needs and goals of each project. Our team of seasoned experts combines industry knowledge with innovative thinking to deliver solutions that drive success. We are committed to maintaining the highest standards of professionalism and integrity, ensuring that our clients receive the most reliable and insightful advisory services.
                    </p>
                </div>

                {/* WHAT WE DO COLUMN */}
                <div className="content-column border-l-2 border-[#28a745] pl-8">
                    <h3 className="text-2xl font-bold uppercase mb-4 text-white">
                        What We Do
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                        We assess the technical aspects of projects to ensure they meet investment criteria. We evaluate feasibility, performance risks, and compliance with standards, providing critical insights that help lenders and client to make informed financing decisions and manage risks effectively throughout the project lifecycle.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompanyOverview;