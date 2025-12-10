// src/components/about/CompanyOverview.tsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTED IMAGES ---
import team from "../About/CompanyRoles/Team.avif";
import inspection from "../About/CompanyRoles/inspection.avif";

gsap.registerPlugin(ScrollTrigger);

// --- 1. FRAMER MOTION VARIANTS FOR TEXT REVEAL ---
const revealVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
        y: "0%",
        transition: {
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.05 * i
        }
    })
};

const MaskedText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-2`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        custom={i + delay}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

const CompanyOverview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Track which index is currently hovered
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // --- 2. PARALLAX SCROLL LOGIC ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".parallax-col", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const content = [
        {
            title: "Our Company",
            text: "At Infravisory Consultancy Pvt. Limited (Energica), we believe in a client-centric approach, focusing on understanding the unique needs and goals of each project. Our team combines industry knowledge with innovative thinking.",
            src: team,
            color: "#28a745"
        },
        {
            title: "What We Do",
            text: "We assess the technical aspects of projects to ensure they meet investment criteria. We evaluate feasibility, performance risks, and compliance with standards, providing critical insights for financing decisions.",
            src: inspection,
            color: "#1a1a1a"
        }
    ];

    // GSAP Hover Animation Helper
    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
        // Animate Title slightly to the right
        gsap.to(`.company-title-${index}`, { x: 10, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = (index: number) => {
        setHoveredIndex(null);
        // Reset Title position
        gsap.to(`.company-title-${index}`, { x: 0, duration: 0.4, ease: "power2.out" });
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#0b0b0b] text-white pt-10 pb-32 px-6 overflow-hidden cursor-default">
            
            {/* Background Noise */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#28a745] font-mono tracking-[0.2em] text-sm uppercase font-bold block mb-6"
                    >
                        The Energica Story
                    </motion.span>

                    <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter">
                        <div className="overflow-hidden">
                            <motion.span 
                                initial={{ y: "100%" }} 
                                whileInView={{ y: "0%" }} 
                                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                className="block"
                            >
                                A Foundation
                            </motion.span>
                        </div>
                        <div className="overflow-hidden">
                            <motion.span 
                                initial={{ y: "100%" }} 
                                whileInView={{ y: "0%" }} 
                                transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                                className="block"
                            >
                                of <span className="text-gray-600">Integrity.</span>
                            </motion.span>
                        </div>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-start">
                    {content.map((item, index) => (
                        <div 
                            key={index} 
                            // Hover handlers
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            className={`group border-t border-gray-800 pt-12 ${index === 1 ? 'parallax-col md:mt-40' : ''} relative`}
                        >
                            {/* --- IMAGE BACKGROUND (Reveals on Hover) --- */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        // Animation: Scale down slightly and Fade in
                                        initial={{ opacity: 0, scale: 1.05 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }} // Fade out slightly growing
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Elegant ease
                                        className="absolute -inset-6 z-0 rounded-2xl overflow-hidden pointer-events-none"
                                    >
                                        <img 
                                            src={item.src} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover opacity-60" // Reduced opacity so text pops more
                                        />
                                        {/* Gradient Overlay for better text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* --- TEXT CONTENT (Foreground) --- */}
                            <div className="relative z-10 pointer-events-none">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-[#28a745]' : 'bg-white'} transition-transform duration-300 group-hover:scale-150`}></div>
                                    {/* Added class for GSAP targeting */}
                                    <h3 className={`company-title-${index} text-3xl md:text-4xl font-bold uppercase text-white group-hover:text-[#28a745] transition-colors duration-300 drop-shadow-lg`}>
                                        {item.title}
                                    </h3>
                                </div>
                                
                                <div className="drop-shadow-xl">
                                    <MaskedText 
                                        text={item.text} 
                                        className="text-gray-400 text-xl leading-[1.6] group-hover:text-white transition-colors duration-500" 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>  
    );
};

export default CompanyOverview;