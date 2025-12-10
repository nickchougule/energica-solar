// src/components/about/CSRSection.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';

const CSRSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the Image to scroll the text over it
            gsap.to(imageRef.current, {
                y: 100, // Minimal parallax movement
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            // Text Reveal
            gsap.from(".csr-text", {
                y: 40,
                opacity: 0,
                stagger: 0.3,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-screen h-[120vh] bg-[#0b0b0b] text-white overflow-hidden">
            
            {/* FIXED IMAGE BACKGROUND (Creative Blend) */}
            <div className="absolute inset-0 z-0">
                <img 
                    ref={imageRef} 
                    src="https://images.unsplash.com/photo-1596706915175-10313f8c87c7?q=80&w=2070&auto=format&fit=crop" // Image of a clean environment/community
                    alt="CSR initiative" 
                    className="w-full h-full object-cover filter grayscale opacity-20 mix-blend-soft-light" 
                />
            </div>
            
            {/* CONTENT OVERLAY */}
            <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center items-center text-center">
                
                <h2 className="csr-text text-7xl md:text-9xl font-black uppercase leading-none text-white mix-blend-difference">
                    <span className="text-[#28a745]">AWARENESS.</span>
                </h2>
                <h2 className="csr-text text-7xl md:text-9xl font-black uppercase leading-none text-white mb-10 mix-blend-difference">
                    <span className="text-white">SUSTAINABILITY.</span>
                </h2>

                <p className="csr-text text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mt-10">
                    Our commitment goes beyond projects. We actively promote solar adoption through community awareness programs and capacity building for rural installers, ensuring equitable access to green energy technologies and knowledge.
                </p>
                <motion.button 
                    className="csr-text mt-12 px-8 py-3 border-2 border-[#28a745] text-[#28a745] uppercase font-bold tracking-widest hover:bg-[#28a745] hover:text-black transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Initiatives
                </motion.button>
            </div>

        </div>
    );
};

export default CSRSection;