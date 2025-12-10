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
            // Scales up and stays subtle in the background
            gsap.fromTo(textRef.current, 
                { scale: 0.8, opacity: 0.2 }, // Start visible (20% opacity)
                {
                    scale: 1.3, // Slight zoom
                    opacity: 0.1, // Fade out slightly as it grows
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

    const techData = [
        { 
            id: 1,
            align: "start", 
            title: "Grid-Tied Systems", 
            desc: "Connected directly to the utility grid. Ideal for reducing bills through net metering. No battery required.", 
            img: grid 
        },
        { 
            id: 2,
            align: "end", 
            title: "Hybrid Inverters", 
            desc: "Combines solar + grid + battery functionality. Allows backup, peak shaving, and smart energy management.", 
            img: hybrid 
        },
        { 
            id: 3,
            align: "start", 
            title: "Micro Inverters", 
            desc: "Module-level inverters installed behind each panel. Improves efficiency, safety, and monitoring.", 
            img: micro 
        }
    ];

    return (
        // CHANGED: Reduced py-40 to py-20 to reduce top/bottom spacing
        <div ref={container} className="relative bg-[#0b0b0b] text-white py-20 overflow-hidden min-h-[150vh]">
            
            {/* 1. BACKGROUND HUGE TITLE (Proper Dark White) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 
                    ref={textRef} 
                    className="text-[15vw] font-black text-white/10 leading-none text-center whitespace-nowrap select-none tracking-tighter"
                    style={{ 
                        zIndex: 0,
                        textShadow: "0 0 30px rgba(255,255,255,0.05)" // Subtle glow for 'Dark White' effect
                    }}
                >
                    CORE TECH
                </h1>
            </div>

            {/* 2. CARDS CONTAINER */}
            {/* CHANGED: Reduced gap-32 to gap-20 to reduce space between cards */}
            <div ref={cardsContainerRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 flex flex-col gap-20">
                
                {techData.map((tech) => (
                    <div 
                        key={tech.id} 
                        className={`flex w-full ${tech.align === 'end' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* THE CARD */}
                        <div className="tech-card group relative w-full md:w-[600px] h-[400px] md:h-[500px] overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl hover:border-[#28a745] transition-all duration-500">
                            
                            {/* Image Background */}
                            <img 
                                src={tech.img} 
                                alt={tech.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                
                                <span className="text-[#28a745] font-mono text-xs tracking-widest uppercase mb-2 block">
                                    System 0{tech.id}
                                </span>

                                <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white group-hover:text-[#28a745] transition-colors">
                                    {tech.title}
                                </h3>

                                {/* Divider Line */}
                                <div className="h-[2px] w-12 bg-[#28a745] mb-6 group-hover:w-full transition-all duration-700 ease-in-out"></div>

                                {/* Description (Reveals on Hover) */}
                                <div className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                        {tech.desc}
                                    </p>
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