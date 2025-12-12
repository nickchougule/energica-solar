import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useNavigate } from 'react-router-dom';

// IMPORT YOUR LOCAL IMAGES
import PMSURYAGHAR from "../assets/PMSuryaGhar.avif";
import solarRoof from "../assets/SolarInFarm.avif";
import smartProgram from "../assets/SmartProgram.avif";
import antina from "../assets/Antina.avif";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
    const component = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);
    
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".gallery-panel");
            const isMobile = window.innerWidth < 768;

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + (slider.current!.offsetWidth / (isMobile ? 1 : 3)), 
                }
            });
        }, component);

        return () => ctx.revert();
    }, []);

    // --- UPDATED NAVIGATION HANDLER ---
    const handleNavigation = () => {
        // 1. Navigate to the route
        navigate('/awarenesscompaign');
        
        // 2. FORCE Scroll to top instantly. 
        // We use 'instant' behavior to prevent the browser from trying to smooth scroll 
        // from the bottom (4000px) to the top, which causes the glitch.
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        
        // 3. Redundant check: Set it again after a tiny delay 
        // This catches cases where React Router takes a millisecond to mount the new page.
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 10);
    };

    const slides = [
        {
            id: 1,
            title: "PM SURYA GHAR",
            subtitle: "Residential Rooftop",
            img: PMSURYAGHAR, 
            desc: "Muft Bijli Yojana. Subsidy up to ₹78,000 for residential households. Target: 1 Crore homes."
        },
        {
            id: 2,
            title: "KUSUM SCHEME",
            subtitle: "Solar for Farmers",
            img: solarRoof, 
            desc: "Diesel-free irrigation. Up to 90% subsidy for standalone solar pumps. Income from surplus power."
        },
        {
            id: 3,
            title: "SMART PROGRAM",
            subtitle: "Community Solar",
            img: smartProgram,
            desc: "Strengthening rural energy security. Focused on BPL and economically weaker sections."
        },
        {
            id: 4,
            title: "OPEN ACCESS",
            subtitle: "Industrial Green Energy",
            img: antina, 
            desc: "For Industries >100 kW. 100% Renewable sourcing to reduce carbon footprint and energy costs."
        }
    ];

    return (
        <div ref={component} className="bg-[#0b0b0b] text-white overflow-hidden">

            <div className="py-12 md:py-20 px-4 md:px-10 text-center">
                <p className="text-[#28a745] uppercase tracking-widest text-xs md:text-sm mb-2 font-bold">Government Initiatives</p>
                <h2 className="text-3xl md:text-5xl font-bold uppercase">Key Solar Schemes</h2>
            </div>

            <div ref={slider} className="w-[400vw] h-[100dvh] flex flex-nowrap">

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="gallery-panel w-screen h-[100dvh] flex-none flex items-center justify-center relative border-r border-gray-900"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-60 transition-transform duration-700 hover:scale-105"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        <div className="relative z-10 max-w-4xl px-6 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-10 md:mt-0">
                            
                            <div className="text-[25vw] md:text-[12rem] font-bold text-white/10 absolute -top-16 left-4 md:-top-40 md:left-0 select-none z-0">
                                0{index + 1}
                            </div>

                            <div className="flex flex-col relative z-10 text-center md:text-left">
                                <span className="text-[#28a745] font-mono tracking-widest mb-2 md:mb-4 font-bold text-xs md:text-base">
                                    {slide.subtitle}
                                </span>
                                
                                <h3 className="text-4xl sm:text-5xl md:text-8xl font-bold uppercase leading-none mb-4 md:mb-6">
                                    {slide.title}
                                </h3>
                                
                                <p className="text-base md:text-2xl font-light text-gray-300 max-w-lg mx-auto md:mx-0">
                                    {slide.desc}
                                </p>
                                
                                <button 
                                    onClick={handleNavigation}
                                    className="mt-6 md:mt-8 px-6 py-2 md:px-8 md:py-3 border border-[#28a745] text-[#28a745] text-xs md:text-sm tracking-widest uppercase hover:bg-[#28a745] hover:text-white transition-colors w-max mx-auto md:mx-0"
                                >
                                    Check Eligibility
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default GallerySection;