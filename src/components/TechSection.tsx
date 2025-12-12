import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. ADD THIS IMPORT
import { useNavigate } from 'react-router-dom';

// IMPORT LOCAL IMAGES
import grid from "../assets/Grid.avif";
import hybrid from "../assets/Hybrid.avif";
import micro from "../assets/MIcro.avif";

gsap.registerPlugin(ScrollTrigger);

const TechSection = () => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    
    // 2. INITIALIZE NAVIGATION
    const navigate = useNavigate();
    
    // Track Active Card (for Mobile Click Logic)
    const [activeId, setActiveId] = useState<number | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // GSAP MatchMedia for robust responsive animations
            let mm = gsap.matchMedia();

            mm.add({
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)",
            }, (context) => {
                let { isMobile } = context.conditions;

                // 1. BACKGROUND TITLE ANIMATION
                gsap.fromTo(textRef.current, 
                    { scale: 0.8, opacity: 0.2 }, 
                    {
                        scale: isMobile ? 1.1 : 1.3, // Less scale on mobile
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
                if (!isMobile) {
                    const cards = gsap.utils.toArray(".tech-card-anim");
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
                } else {
                    // Simple fade for mobile
                    const cards = gsap.utils.toArray(".tech-card-anim");
                    cards.forEach((card: any) => {
                        gsap.from(card, {
                            y: 50,
                            opacity: 0,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%", 
                            }
                        });
                    });
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    // HANDLE INTERACTION
    const handleMouseEnter = (id: number) => {
        if (window.innerWidth > 768) {
            setActiveId(id);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 768) {
            setActiveId(null);
        }
    };

    const handleClick = (id: number) => {
        if (window.innerWidth <= 768) {
            // Toggle logic for mobile
            setActiveId(prev => prev === id ? null : id);
        }
    };

    const techData = [
        { 
            id: 1,
            align: "start", 
            title: "Core Technology", 
            img: grid, 
            subPoints: [
                { subtitle: "Grid-Tied System", info: "Seamlessly connects to the utility grid for net metering benefits." },
                { subtitle: "Off-Grid System", info: "Independent power generation with battery storage for remote locations." }
            ]
        },
        { 
            id: 2,
            align: "end", 
            title: "New Technology", 
            img: hybrid, 
            subPoints: [
                { subtitle: "Hybrid Inverters", info: "Smartly manages solar, battery, and grid power simultaneously." },
                { subtitle: "Microinverters", info: "Panel-level optimization for maximum efficiency and safety." },
                { subtitle: "Lithium-ion Batteries", info: "High-density, long-lasting energy storage solutions." }
            ]
        },
        { 
            id: 3,
            align: "start", 
            title: "Capacity Building", 
            img: micro, 
            subPoints: [
                { subtitle: "Sustainability", info: "Training on long-term environmental and energy viability." },
                { subtitle: "Administration", info: "Management skills for renewable energy project oversight." },
                { subtitle: "Accounting", info: "Financial planning and ROI analysis for solar investments." }
            ]
        }
    ];

    return (
        <div ref={container} className="relative bg-[#0b0b0b] text-white py-20 overflow-hidden min-h-[120vh]">
            
            {/* 1. BACKGROUND HUGE TITLE */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 
                    ref={textRef} 
                    className="text-[18vw] font-black text-white/10 leading-none text-center whitespace-nowrap select-none tracking-tighter"
                    style={{ 
                        zIndex: 0,
                        textShadow: "0 0 30px rgba(255,255,255,0.05)" 
                    }}
                >
                    EXPERTISE
                </h1>
            </div>

            {/* 2. CARDS CONTAINER */}
            <div ref={cardsContainerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20 flex flex-col gap-8 md:gap-20">
                
                {techData.map((tech) => {
                    const isActive = activeId === tech.id;

                    return (
                        <div 
                            key={tech.id} 
                            className={`flex w-full ${tech.align === 'end' ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}
                        >
                            {/* THE CARD */}
                            <div 
                                className={`tech-card-anim group relative overflow-hidden rounded-2xl border bg-gray-900 shadow-2xl transition-all duration-500 cursor-pointer
                                    ${isActive ? 'border-[#28a745]' : 'border-gray-800'}
                                    /* Mobile Dimensions vs Desktop Dimensions */
                                    w-[90vw] h-[400px]
                                    md:w-[650px] md:h-[550px]
                                `}
                                onMouseEnter={() => handleMouseEnter(tech.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(tech.id)}
                            >
                                
                                {/* Image Background - Zooms on Active/Hover */}
                                <img 
                                    src={tech.img} 
                                    alt={tech.title} 
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700
                                        ${isActive ? 'scale-110' : 'scale-100'}
                                    `}
                                />
                                
                                {/* Dark Gradient Overlay - Darkens when active to make text readable */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-500
                                    ${isActive ? 'opacity-95' : 'opacity-80'}
                                `}></div>

                                {/* Content Wrapper - Slides up on Active/Hover */}
                                <div className={`absolute bottom-0 left-0 p-6 md:p-10 w-full transition-transform duration-500 ease-out
                                    ${isActive ? 'translate-y-0' : 'translate-y-[calc(100%-120px)] md:translate-y-[calc(100%-140px)]'}
                                `}>
                                    
                                    <span className="text-[#28a745] font-mono text-xs tracking-widest uppercase mb-2 block">
                                        Section 0{tech.id}
                                    </span>

                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className={`text-2xl md:text-4xl font-bold uppercase transition-colors
                                            ${isActive ? 'text-[#28a745]' : 'text-white'}
                                        `}>
                                            {tech.title}
                                        </h3>
                                        
                                        {/* Mobile Tap Indicator */}
                                        <div className={`md:hidden text-[#28a745] text-xl transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                                            ▼
                                        </div>
                                    </div>

                                    {/* Divider Line */}
                                    <div className={`h-[2px] bg-[#28a745] mb-6 transition-all duration-700 ease-in-out
                                        ${isActive ? 'w-full' : 'w-12'}
                                    `}></div>

                                    {/* Description & Subpoints */}
                                    {/* Using opacity delay to ensure it looks smooth */}
                                    <div className={`flex flex-col gap-4 mb-6 transition-all duration-500 delay-100
                                        ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}
                                    `}>
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
                                    <div className={`transition-all duration-500 delay-200
                                         ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                                    `}>
                                        <button 
                                            className="px-6 py-2 border border-[#28a745] text-[#28a745] hover:bg-[#28a745] hover:text-white uppercase text-xs font-bold tracking-widest transition-all duration-300"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent closing card when clicking button
                                                // 3. UPDATED NAVIGATION
                                                navigate('/Training');
                                            }}
                                        >
                                            Explore More
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default TechSection;