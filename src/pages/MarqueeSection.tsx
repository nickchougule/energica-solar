import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MarqueeSection = () => {
    const slider = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(slider.current, { xPercent: -50, duration: 25, ease: "linear", repeat: -1 });
        });
        return () => ctx.revert();
    }, []);

    return (
        // WHITE TEXT ON BLACK BG
        <div className="bg-[#0b0b0b] text-white py-6 overflow-hidden relative z-20 border-y border-gray-800">
            <div ref={slider} className="flex whitespace-nowrap w-fit">
                <h1 className="text-[4vw] font-bold uppercase leading-none px-4 flex items-center gap-10 opacity-80">
                    <span>☀️ Solarizing Maharashtra</span>
                    <span>• 100+ MW Supplied</span>
                    <span>• 500+ Integrators Trained</span>
                    <span>• PM Surya Ghar Scheme</span>
                    <span>•</span>
                </h1>
                <h1 className="text-[4vw] font-bold uppercase leading-none px-4 flex items-center gap-10 opacity-80">
                    <span>☀️ Solarizing Maharashtra</span>
                    <span>• 100+ MW Supplied</span>
                    <span>• 500+ Integrators Trained</span>
                    <span>• PM Surya Ghar Scheme</span>
                    <span>•</span>
                </h1>
            </div>
        </div>
    );
};

export default MarqueeSection;