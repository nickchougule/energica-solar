import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. IMPORT YOUR LOCAL IMAGE
import ContactBg from "../assets/ContactSection.jpeg";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const container = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Text Reveal Animation
            gsap.from(textRef.current, {
                y: 100, 
                opacity: 0, 
                duration: 1.5, 
                ease: "power4.out",
                scrollTrigger: { 
                    trigger: container.current, 
                    start: "top 70%" 
                }
            });

            // Magnetic Button Effect
            const btn = buttonRef.current;
            if (btn) {
                const moveBtn = (e: MouseEvent) => {
                    const rect = btn.getBoundingClientRect();
                    gsap.to(btn, { 
                        x: (e.clientX - rect.left - rect.width/2)*0.3, 
                        y: (e.clientY - rect.top - rect.height/2)*0.3, 
                        duration: 0.3 
                    });
                };
                const leaveBtn = () => gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
                
                btn.addEventListener('mousemove', moveBtn); 
                btn.addEventListener('mouseleave', leaveBtn);
                
                return () => { 
                    btn.removeEventListener('mousemove', moveBtn); 
                    btn.removeEventListener('mouseleave', leaveBtn); 
                };
            }
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative w-screen h-[70vh] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
            
            {/* 2. BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={ContactBg} 
                    alt="Contact Background" 
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay to make text readable */}
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <p className="text-[#28a745] tracking-[0.5em] text-sm uppercase mb-6 font-bold bg-white/10 py-2 px-4 rounded-full w-fit mx-auto border border-[#28a745]/30">
                    Partner With Us
                </p>

                <h2 ref={textRef} className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-12 leading-tight">
                    Start Your <br /> <span className="text-white text-stroke">Solar Journey</span>
                </h2>

                <button 
                    ref={buttonRef} 
                    onClick={() => window.location.href = "mailto:connect@solarbni.com"} 
                    className="group relative px-12 py-5 bg-[#28a745] text-white rounded-full overflow-hidden transition-transform hover:scale-105 shadow-2xl border border-[#28a745]"
                >
                    {/* Hover Fill Effect (White) */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    
                    <span className="relative z-10 font-bold tracking-widest uppercase text-sm group-hover:text-[#28a745] transition-colors duration-300">
                        Get Consultation
                    </span>
                </button>
                
                <p className="mt-8 text-sm text-gray-400 tracking-widest uppercase font-semibold">
                    Call us: +91 77700 11558
                </p>
            </div>
        </div>
    );
};

export default CTASection;