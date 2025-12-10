import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// IMPORT LOGO
import logo from "../assets/Energica.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Instantly set initial state (Hidden above the container)
            gsap.set(bigTextRef.current, { yPercent: -100 });

            // 2. The Reveal Animation (Slides DOWN into view)
            gsap.to(bigTextRef.current, {
                yPercent: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 70%", // Start earlier for smoother feel
                    end: "bottom bottom", 
                    scrub: 1, 
                }
            });

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-black text-white pt-24 pb-0 border-t border-gray-900 relative z-20 overflow-hidden flex flex-col justify-between min-h-[70vh]">
            
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto w-full relative z-20 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-16">
                    
                    {/* LEFT SIDE: LOGO & DESC */}
                    <div className="md:w-1/3">
                        <div className="mb-8">
                            <img 
                                src={logo} 
                                alt="Energica Logo" 
                                className="h-28 w-auto object-contain" // Increased Logo Size
                            />
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Bridging the gap between technical feasibility and financial viability. We assess renewable projects to ensure investments are sound, compliant, and optimized for success.
                        </p>
                    </div>

                    {/* RIGHT SIDE: COLUMNS - INCREASED SIZES */}
                    <div className="flex flex-wrap gap-20 w-full md:w-auto mt-10 md:mt-0">
                        
                        <div className="flex flex-col gap-5">
                            {/* Larger Header */}
                            <h4 className="uppercase tracking-widest text-sm font-bold text-[#28a745] mb-2">Company</h4>
                            {/* Larger Links */}
                            <a href="#about" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">About Us</a>
                            <a href="#projects" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Projects</a>
                            <a href="#careers" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Careers</a>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h4 className="uppercase tracking-widest text-sm font-bold text-[#28a745] mb-2">Socials</h4>
                            <a href="#" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Twitter</a>
                            <a href="#" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Instagram</a>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h4 className="uppercase tracking-widest text-sm font-bold text-[#28a745] mb-2">Legal</h4>
                            <a href="#" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#28a745] text-gray-300 text-xl transition-colors">Terms</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- THE BIG TITLE REVEAL (MASKED) --- */}
            {/* Dashed border + No padding top to remove gap */}
            <div className="w-full border-t border-dashed border-gray-700 overflow-hidden relative mt-auto">
                 <div className="w-full overflow-hidden">
                    <h1 
                        ref={bigTextRef}
                        // Massive text size, tight leading to hug the line
                        className="text-[20vw] font-black leading-[0.75] text-white text-center select-none tracking-tighter"
                    >
                        ENERGICA
                    </h1>
                 </div>
            </div>

        </footer>
    );
};

export default Footer;