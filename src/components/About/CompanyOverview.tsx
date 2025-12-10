// src/components/about/CompanyOverview.tsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// --- IMPORTED IMAGES ---
import team from "../About/CompanyRoles/Team.avif";
import inspection from "../About/CompanyRoles/inspection.avif";

gsap.registerPlugin(ScrollTrigger);

// ... (Keep revealVariants and MaskedText exactly as they are) ...
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
    const modalContainer = useRef<HTMLDivElement>(null);
    const cursorLabel = useRef<HTMLDivElement>(null);
    const [activeModal, setActiveModal] = useState({ active: false, index: 0 });

    useEffect(() => {
        const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        const xMoveLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        const yMoveLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            const { pageX, pageY } = e;
            xMoveContainer(pageX);
            yMoveContainer(pageY);
            xMoveLabel(pageX);
            yMoveLabel(pageY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

    return (
        // 👇 FIX IS HERE: Changed bg-[#050505] to bg-[#0b0b0b]
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#0b0b0b] text-white py-32 px-6 overflow-hidden cursor-default">
            
            {/* GLOBAL GRAIN OVERLAY */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            {/* --- FLOATING MODAL --- */}
            <motion.div 
                ref={modalContainer} 
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    open: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
                    closed: { scale: 0, opacity: 0, transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
                }}
                animate={activeModal.active ? "open" : "closed"}
                className="h-[350px] w-[400px] absolute overflow-hidden pointer-events-none rounded-2xl z-20 top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            >
                <div style={{ top: `${activeModal.index * -100}%` }} className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                    {content.map((project, index) => (
                        <div key={index} className="h-full w-full flex items-center justify-center bg-[#111]">
                            <img src={project.src} alt={project.title} className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* --- CURSOR LABEL --- */}
            <motion.div 
                ref={cursorLabel}
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    open: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
                    closed: { scale: 0, opacity: 0, transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] } }
                }}
                animate={activeModal.active ? "open" : "closed"}
                className="w-20 h-20 rounded-full bg-[#28a745] text-white fixed z-30 flex items-center justify-center pointer-events-none top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:flex"
            >
                <span className="text-xs font-bold uppercase">View</span>
            </motion.div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-32">
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
                            className={`group border-t border-gray-800 pt-12 ${index === 1 ? 'parallax-col md:mt-40' : ''}`}
                            onMouseEnter={() => setActiveModal({ active: true, index })}
                            onMouseLeave={() => setActiveModal({ active: false, index })}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-[#28a745]' : 'bg-white'} transition-transform duration-300 group-hover:scale-150`}></div>
                                <h3 className="text-3xl md:text-4xl font-bold uppercase text-white group-hover:text-[#28a745] transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div>
                            <MaskedText 
                                text={item.text} 
                                className="text-gray-400 text-xl leading-[1.6] group-hover:text-white transition-colors duration-500" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>  
    );
};

export default CompanyOverview;