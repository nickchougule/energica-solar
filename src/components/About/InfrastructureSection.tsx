// src/components/about/InfrastructureSection.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const pillars = [
    { title: "Manufacturing", desc: "Strategic partnerships for high-quality PV module and inverter production, ensuring reliable supply chains." },
    { title: "Distribution Network", desc: "Optimized logistics and warehousing across key regional hubs for fast, efficient delivery to project sites." },
    { title: "Training Centers", desc: "State-of-the-art facilities providing technical and safety training for installers and project managers." },
];

const InfrastructureSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 3D Rotation Reveal
            gsap.from(cardRefs.current, {
                opacity: 0,
                y: 100,
                rotateX: 45, // Tilt backwards
                stagger: 0.2,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0b0b0b] text-white py-32 px-6 md:px-20 relative">
            <div className="max-w-7xl mx-auto">
                <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-4">
                    Our Backbone
                </span>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-20 text-white">
                    Integrated <span className="text-gray-600">Infrastructure.</span>
                </h2>

                {/* 3D Perspective Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10" style={{ perspective: '1000px' }}>
                    {pillars.map((item, idx) => (
                        <div 
                            key={idx} 
                            ref={(el) => (cardRefs.current[idx] = el)}
                            className="bg-[#171717] p-8 rounded-xl h-[400px] shadow-xl border-t-4 border-[#28a745] transform origin-bottom" // origin-bottom helps the 3D rotation look good
                        >
                            <span className="text-[#28a745] text-4xl font-black block mb-4">0{idx + 1}</span>
                            <h3 className="text-3xl font-bold uppercase mb-4 text-white">{item.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                            <p className="text-sm font-mono mt-8 uppercase text-gray-600">Learn More →</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfrastructureSection;