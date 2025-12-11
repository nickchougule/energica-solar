// src/components/about/CompanyOverview.tsx

import React, { useState, useLayoutEffect, useRef } from 'react';
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
    
    // Track which index is currently active (Hovered on Desktop, Tapped on Mobile)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // --- 2. RESPONSIVE PARALLAX SCROLL LOGIC ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // DESKTOP ONLY: Apply parallax (Shift the second column down)
            mm.add("(min-width: 768px)", () => {
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

    // --- INTERACTION HANDLERS ---
    
    const handleMouseEnter = (index: number) => {
        // Desktop: Hover triggers active state
        if (window.matchMedia("(min-width: 768px)").matches) {
            setActiveIndex(index);
            gsap.to(`.company-title-${index}`, { x: 10, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleMouseLeave = (index: number) => {
        // Desktop: Leave resets active state
        if (window.matchMedia("(min-width: 768px)").matches) {
            setActiveIndex(null);
            gsap.to(`.company-title-${index}`, { x: 0, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleClick = (index: number) => {
        // Mobile: Tap toggles active state (Accordion style)
        if (window.matchMedia("(max-width: 767px)").matches) {
            if (activeIndex === index) {
                setActiveIndex(null); // Close if tapping same
                gsap.to(`.company-title-${index}`, { x: 0, duration: 0.4, ease: "power2.out" });
            } else {
                setActiveIndex(index); // Open new
                gsap.to(`.company-title-${index}`, { x: 10, duration: 0.4, ease: "power2.out" });
            }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#0b0b0b] text-white pt-10 pb-32 px-4 md:px-6 overflow-hidden cursor-default">
            
            {/* Background Noise */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center mb-12 md:mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#28a745] font-mono tracking-[0.2em] text-xs md:text-sm uppercase font-bold block mb-4 md:mb-6"
                    >
                        The Energica Story
                    </motion.span>

                    <h1 className="text-[12vw] md:text-9xl font-black uppercase leading-[0.85] tracking-tighter">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-start">
                    {content.map((item, index) => (
                        <div 
                            key={index} 
                            // Hover logic (Desktop)
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            // Tap logic (Mobile)
                            onClick={() => handleClick(index)}
                            className={`group border-t border-gray-800 pt-8 md:pt-12 ${index === 1 ? 'parallax-col md:mt-40' : ''} relative cursor-pointer md:cursor-default`}
                        >
                            {/* --- IMAGE BACKGROUND (Reveals on Hover/Tap) --- */}
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.05 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }} 
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute -inset-4 md:-inset-6 z-0 rounded-2xl overflow-hidden pointer-events-none"
                                    >
                                        <img 
                                            src={item.src} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover opacity-60" 
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* --- TEXT CONTENT (Foreground) --- */}
                            <div className="relative z-10 pointer-events-none md:pointer-events-auto">
                                <div className="flex items-center gap-4 mb-6 md:mb-8">
                                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === 0 ? 'bg-[#28a745]' : 'bg-white'} transition-transform duration-300 ${activeIndex === index ? 'scale-150' : ''}`}></div>
                                    
                                    <h3 className={`company-title-${index} text-2xl md:text-4xl font-bold uppercase text-white transition-colors duration-300 drop-shadow-lg ${activeIndex === index ? 'text-[#28a745]' : ''}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                
                                <div className="drop-shadow-xl">
                                    <MaskedText 
                                        text={item.text} 
                                        className={`text-lg md:text-xl leading-[1.6] transition-colors duration-500 ${activeIndex === index ? 'text-white' : 'text-gray-400'}`} 
                                    />
                                </div>
                                
                                {/* Mobile Hint: Small text to indicate tap capability */}
                                <div className={`md:hidden mt-4 text-xs font-mono text-[#28a745] transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-60'}`}>
                                    [ Tap to Reveal ]
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