// src/components/about/OurImpact.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const impactData = [
    { label: "MW SUPPLIED", value: 100, suffix: "+" },
    { label: "INTEGRATORS TRAINED", value: 500, suffix: "+" },
    { label: "STATES COVERED", value: 10, suffix: "+" },
    { label: "SUCCESS RATE", value: 98, suffix: "%" },
];

const OurImpact = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const counters = gsap.utils.toArray(".impact-value");

            counters.forEach((counter: any) => {
                const targetValue = parseInt(counter.dataset.target);
                const suffix = counter.dataset.suffix;

                // GSAP to animate the number value
                gsap.fromTo(counter, 
                    { innerText: 0 }, 
                    {
                        innerText: targetValue,
                        duration: 2.5,
                        ease: "power4.out",
                        snap: { innerText: 1 }, // Snap makes sure it updates as integers
                        scrollTrigger: {
                            trigger: counter,
                            start: "top 85%",
                            toggleActions: "play none none reset",
                        },
                        onUpdate: function() {
                            // Ensure we don't double up suffixes if GSAP rounds weirdly
                            // We only display the number here. The suffix is handled in a span next to it for better layout control.
                            counter.textContent = Math.round(this.targets()[0].innerText);
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-black text-white py-16 md:py-32 px-4 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <span className="text-[#28a745] font-mono tracking-widest text-xs md:text-sm uppercase font-bold block mb-4">
                    Measurable Results
                </span>
                
                {/* Responsive Heading */}
                <h2 className="text-[10vw] md:text-8xl font-black uppercase leading-[0.9] mb-12 md:mb-20 text-white break-words">
                    Our <span className="text-gray-600">Impact.</span>
                </h2>

                {/* Grid Layout: Stacks on mobile, 2 cols on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {impactData.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-l-2 border-[#28a745] pl-6 py-4 md:h-40 justify-center">
                            
                            <div className="flex items-baseline gap-1">
                                {/* Responsive Number Size */}
                                <h3 
                                    className="impact-value text-5xl md:text-7xl font-black text-white leading-none tabular-nums"
                                    data-target={item.value}
                                    data-suffix={item.suffix}
                                >
                                    0
                                </h3>
                                {/* Suffix separate to prevent jumpy animation */}
                                <span className="text-2xl md:text-3xl font-black text-[#28a745]">{item.suffix}</span>
                            </div>
                            
                            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mt-2 font-mono">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurImpact;