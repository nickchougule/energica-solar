// src/components/about/OurImpact.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
                            counter.textContent = Math.round(this.targets()[0].innerText) + suffix;
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-black text-white py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-4">
                    Measurable Results
                </span>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-20 text-white">
                    Our <span className="text-gray-600">Impact.</span>
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {impactData.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-l border-[#28a745] pl-6 h-40 justify-center">
                            <div className="flex items-baseline">
                                <h3 
                                    className="impact-value text-7xl font-black text-white leading-none"
                                    data-target={item.value}
                                    data-suffix={item.suffix}
                                >
                                    {/* Initial Value, GSAP overwrites this */}
                                    0
                                </h3>
                                <span className="text-3xl font-black text-[#28a745]">{item.suffix}</span>
                            </div>
                            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
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