// src/components/about/InfrastructureSection.tsx

import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const pillars = [
    { 
        id: "01",
        title: "Manufacturing", 
        subtitle: "Supply Chain Zero",
        desc: "Strategic partnerships for high-quality PV module and inverter production. We utilize automated assembly lines to ensure zero-defect supply chains.",
        gradient: "linear-gradient(135deg, #0f380f 0%, #000000 100%)", 
        accent: "#28a745"
    },
    { 
        id: "02",
        title: "Distribution", 
        subtitle: "Global Logistics",
        desc: "Optimized logistics and warehousing across key regional hubs. Our AI-driven fleet management ensures just-in-time delivery to remote project sites.",
        gradient: "linear-gradient(135deg, #064e3b 0%, #000000 100%)",
        accent: "#34d399"
    },
    { 
        id: "03",
        title: "Training Cmd", 
        subtitle: "Safety & Certification",
        desc: "State-of-the-art facilities providing technical and safety training. We simulate high-voltage scenarios to certify the next generation of project managers.",
        gradient: "linear-gradient(135deg, #115e59 0%, #000000 100%)",
        accent: "#2dd4bf"
    },
];

const InfrastructureSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(0); 

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(".infra-title-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Deck Entrance Animation
            // FIX: This looks for .infra-deck-item, which we added below
            gsap.from(".infra-deck-item", {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".infra-deck-container",
                    start: "top 85%",
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-[#050505] text-white py-32 px-4 md:px-12 relative min-h-screen overflow-hidden">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* HEADER */}
                <div className="mb-20">
                    <span className="infra-title-anim inline-block text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold mb-4 border-b border-[#28a745] pb-1">
                        Infrastructure Matrix
                    </span>
                    <h2 className="infra-title-anim text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                        The Backbone <br />
                        <span className="text-gray-700">Of Energica.</span>
                    </h2>
                </div>

                {/* THE KINETIC DECK (Accordion) */}
                <div className="infra-deck-container flex flex-col gap-2">
                    {pillars.map((item, index) => {
                        const isActive = activeIndex === index;
                        
                        return (
                            <motion.div
                                key={item.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                animate={{ 
                                    height: isActive ? 450 : 100,
                                    backgroundColor: isActive ? "rgba(20, 20, 20, 1)" : "rgba(10, 10, 10, 0.5)"
                                }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                // 👇 FIX APPLIED HERE: Added 'infra-deck-item' class
                                className="infra-deck-item group relative w-full overflow-hidden border border-white/10 rounded-2xl cursor-pointer"
                                style={{
                                    backgroundImage: isActive ? item.gradient : 'none'
                                }}
                            >
                                {/* CONTENT WRAPPER */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                    
                                    {/* TOP ROW: ID and Title */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-6">
                                            <span className={`text-xl font-mono tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                                /{item.id}
                                            </span>
                                            <h3 className={`text-3xl md:text-5xl font-black uppercase transition-all duration-300 ${isActive ? 'translate-x-4 text-white' : 'text-gray-500'}`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        
                                        {/* Animated Icon Arrow */}
                                        <motion.div 
                                            animate={{ rotate: isActive ? 90 : 0 }}
                                            className={`text-2xl ${isActive ? 'text-white' : 'text-gray-700'}`}
                                        >
                                            ➔
                                        </motion.div>
                                    </div>

                                    {/* REVEAL CONTENT (Only visible when active) */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-auto"
                                            >
                                                <div className="max-w-xl">
                                                    <div className="text-sm font-mono text-white/60 mb-2 uppercase tracking-wider">
                                                        {item.subtitle}
                                                    </div>
                                                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>

                                                {/* Decorative Technical UI */}
                                                <div className="hidden md:block text-right">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <div className="w-24 h-1 bg-white/20 overflow-hidden rounded-full">
                                                            <motion.div 
                                                                initial={{ x: "-100%" }}
                                                                animate={{ x: "0%" }}
                                                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                                className="w-full h-full bg-white"
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-mono text-white/50 uppercase">
                                                            System Status: Nominal
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>

                                {/* Hover Scanline Effect */}
                                {isActive && (
                                    <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30" 
                                         style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }}>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default InfrastructureSection;