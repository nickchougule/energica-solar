import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// IMPORT LOCAL IMAGES
import grid from "../assets/Grid.avif";
import hybrid from "../assets/Hybrid.avif";
import micro from "../assets/MIcro.avif";

gsap.registerPlugin(ScrollTrigger);

const TechSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. BACKGROUND TITLE ANIMATION
            gsap.fromTo(textRef.current, 
                { scale: 0.8, opacity: 0.2 }, 
                {
                    scale: 1.3, 
                    opacity: 0.1, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1, 
                    }
                }
            );

            // 2. PARALLAX CARD ANIMATION
            const cards = gsap.utils.toArray(".tech-card");
            cards.forEach((card: any) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%", 
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, container);

        return () => ctx.revert();
    }, []);

    // UPDATED DATA STRUCTURE TO MATCH YOUR A, B, C REQUIREMENTS
    const techData = [
        { 
            id: 1,
            align: "start", 
            title: "Core Technology", 
            img: grid, // Using 'grid' image for Core Tech
            subPoints: [
                { subtitle: "Grid-Tied System", info: "Seamlessly connects to the utility grid for net metering benefits." },
                { subtitle: "Off-Grid System", info: "Independent power generation with battery storage for remote locations." }
            ]
        },
        { 
            id: 2,
            align: "end", 
            title: "New Technology", 
            img: hybrid, // Using 'hybrid' image for New Tech
            subPoints: [
                { subtitle: "Hybrid Inverters", info: "Smartly manages solar, battery, and grid power simultaneously." },
                { subtitle: "Microinverters", info: "Panel-level optimization for maximum efficiency and safety." },
                { subtitle: "Lithium-ion Batteries", info: "High-density, long-lasting energy storage solutions." }
            ]
        },
        { 
            id: 3,
            align: "start", 
            title: "Capacity Building", // Shortened from "Program" for design balance
            img: micro, // Using 'micro' image for Training/Capacity
            subPoints: [
                { subtitle: "Sustainability", info: "Training on long-term environmental and energy viability." },
                { subtitle: "Administration", info: "Management skills for renewable energy project oversight." },
                { subtitle: "Accounting", info: "Financial planning and ROI analysis for solar investments." }
            ]
        }
    ];

    return (
        <div ref={container} className="relative bg-[#0b0b0b] text-white py-20 overflow-hidden min-h-[150vh]">
            
            {/* 1. BACKGROUND HUGE TITLE */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 
                    ref={textRef} 
                    className="text-[15vw] font-black text-white/10 leading-none text-center whitespace-nowrap select-none tracking-tighter"
                    style={{ 
                        zIndex: 0,
                        textShadow: "0 0 30px rgba(255,255,255,0.05)" 
                    }}
                >
                    EXPERTISE
                </h1>
            </div>

            {/* 2. CARDS CONTAINER */}
            <div ref={cardsContainerRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 flex flex-col gap-20">
                
                {techData.map((tech) => (
                    <div 
                        key={tech.id} 
                        className={`flex w-full ${tech.align === 'end' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* THE CARD */}
                        {/* Increased height slightly to accommodate subpoints */}
                        <div className="tech-card group relative w-full md:w-[650px] h-[450px] md:h-[550px] overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl hover:border-[#28a745] transition-all duration-500">
                            
                            {/* Image Background */}
                            <img 
                                src={tech.img} 
                                alt={tech.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>

                            {/* Content Wrapper */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                
                                <span className="text-[#28a745] font-mono text-xs tracking-widest uppercase mb-2 block">
                                    Section 0{tech.id}
                                </span>

                                <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white group-hover:text-[#28a745] transition-colors">
                                    {tech.title}
                                </h3>

                                {/* Divider Line */}
                                <div className="h-[2px] w-12 bg-[#28a745] mb-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>

                                {/* Description & Subpoints (Reveals on Hover) */}
                                {/* Increased max-height to fit list and button */}
                                <div className="max-h-0 overflow-hidden group-hover:max-h-[400px] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                                    
                                    <div className="flex flex-col gap-4 mb-6">
                                        {tech.subPoints.map((point, index) => (
                                            <div key={index} className="flex flex-col">
                                                <h4 className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#28a745]"></span>
                                                    {point.subtitle}
                                                </h4>
                                                <p className="text-gray-400 text-xs md:text-sm pl-4 leading-relaxed">
                                                    {point.info}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* EXPLORE MORE BUTTON */}
                                    <button 
                                        className="px-6 py-2 border border-[#28a745] text-[#28a745] hover:bg-[#28a745] hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300"
                                        onClick={() => console.log("Navigate to Training Campaign")} // Placeholder logic
                                    >
                                        Explore More
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TechSection;