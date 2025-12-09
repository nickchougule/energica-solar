import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// 1. IMPORT YOUR LOCAL IMAGES
import PMSURYAGHAR from "../assets/PMSuryaGhar.avif";
import solarRoof from "../assets/SolarInFarm.avif";
import smartProgram from "../assets/SmartProgram.avif";
import antina from "../assets/Antina.avif";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
    const component = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const panels = gsap.utils.toArray(".gallery-panel");

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + slider.current!.offsetWidth,
                }
            });
        }, component);

        return () => ctx.revert();
    }, []);

    const slides = [
        {
            id: 1,
            title: "PM SURYA GHAR",
            subtitle: "Residential Rooftop",
            // 2. USE IMPORTED IMAGES
            img: PMSURYAGHAR, 
            desc: "Muft Bijli Yojana. Subsidy up to ₹78,000 for residential households. Target: 1 Crore homes."
        },
        {
            id: 2,
            title: "KUSUM SCHEME",
            subtitle: "Solar for Farmers",
            img: solarRoof, // Using SolarInFarm image
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
            img: antina, // Using Antina image
            desc: "For Industries >100 kW. 100% Renewable sourcing to reduce carbon footprint and energy costs."
        }
    ];

    return (
        <div ref={component} className="bg-[#0b0b0b] text-white overflow-hidden">

            <div className="py-20 px-10 text-center">
                <p className="text-[#28a745] uppercase tracking-widest text-sm mb-2 font-bold">Government Initiatives</p>
                <h2 className="text-4xl md:text-5xl font-bold uppercase">Key Solar Schemes</h2>
            </div>

            <div ref={slider} className="w-[400vw] h-screen flex flex-nowrap">

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="gallery-panel w-screen h-screen flex-none flex items-center justify-center relative border-r border-gray-900"
                    >
                        {/* Background Image - Colorful & Vibrant */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-60 transition-transform duration-700 hover:scale-105"
                                loading="eager"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        <div className="relative z-10 max-w-4xl px-10 flex flex-col md:flex-row items-center gap-10">
                            {/* Giant Number */}
                            <div className="text-[8rem] md:text-[12rem] font-bold text-white/10 absolute -top-20 md:-top-40 left-0 select-none">
                                0{index + 1}
                            </div>

                            <div className="flex flex-col relative">
                                <span className="text-[#28a745] font-mono tracking-widest mb-4 font-bold">{slide.subtitle}</span>
                                <h3 className="text-6xl md:text-8xl font-bold uppercase leading-none mb-6">{slide.title}</h3>
                                <p className="text-xl md:text-2xl font-light text-gray-300 max-w-lg">
                                    {slide.desc}
                                </p>
                                <button className="mt-8 px-8 py-3 border border-[#28a745] text-[#28a745] text-sm tracking-widest uppercase hover:bg-[#28a745] hover:text-white transition-colors w-max">
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