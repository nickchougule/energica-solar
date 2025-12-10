// src/components/about/OngoingProjectsMap.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const projects = [
    { city: "SANGLI", details: "100 MW WIND AND SOLAR HYBRID PROJECT", top: '20%', left: '15%' },
    { city: "SATARA", details: "100 MW SOLAR PV PROJECT", top: '45%', left: '5%' },
    { city: "SOLAPUR", details: "25 MW CUMULATIVE SOLAR PV PROJECT", top: '65%', left: '25%' },
    { city: "PUNE", details: "1 MW SOLAR PV PROJECT", top: '35%', left: '40%' },
];

const OngoingProjectsMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // Map Zoom/Entrance
            gsap.from(mapRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Pinpoint Staggered Reveal
            gsap.from(".project-pin", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "back.out(2)",
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0b0b0b] text-white py-32 px-6 md:px-20 relative min-h-[90vh]">
            <div className="max-w-7xl mx-auto">
                <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-4">
                    Current Execution
                </span>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-20 text-white">
                    Ongoing <span className="text-gray-600">Ventures.</span>
                </h2>
            </div>

            {/* MAP VISUALIZATION AREA */}
            <div 
                ref={mapRef} 
                className="max-w-7xl mx-auto h-[60vh] md:h-[70vh] relative bg-[#171717] rounded-xl overflow-hidden shadow-2xl border border-gray-800"
            >
                {/* Stylized Maharashtra Map/Area placeholder */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542848943-7f3c4e339a06?q=80&w=2070&auto=format&fit=crop')] opacity-10 filter grayscale"></div>
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Project Pinpoints */}
                {projects.map((p, idx) => (
                    <div 
                        key={idx} 
                        className="project-pin absolute flex items-center gap-3 cursor-pointer group hover:scale-105 transition-transform duration-300"
                        style={{ top: p.top, left: p.left }}
                    >
                        <div className="w-3 h-3 bg-[#28a745] rounded-full animate-ping absolute"></div>
                        <div className="w-3 h-3 bg-[#28a745] rounded-full relative"></div>
                        
                        <div className="hidden group-hover:block absolute left-full ml-4 p-3 bg-black/80 backdrop-blur-sm rounded-lg border border-[#28a745] w-64">
                            <p className="text-sm font-bold text-white mb-1">{p.city}</p>
                            <p className="text-xs text-gray-400">{p.details}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default OngoingProjectsMap;