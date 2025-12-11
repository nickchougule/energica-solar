import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ContentSection from "./ContentSection";
// 1. IMPORT YOUR LOCAL IMAGE
import solar from "../assets/solar-Panels.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const bg1 = useRef(null);
    const img_container = useRef(null);
    const container = useRef(null); 
    const text1 = useRef(null);
    const text2 = useRef(null);
    const img = useRef(null);

    useLayoutEffect(() => {
        // Safety Check
        if (!bg1.current || !img_container.current || !container.current) return;

        const ctx = gsap.context(() => {
            // 1. Pin the background
            ScrollTrigger.create({
                trigger: bg1.current,
                pin: bg1.current,
                pinSpacing: false,
                start: "top top",
                endTrigger: ".last", 
                end: "bottom bottom",
            });

            // 2. Set initial state for ContentSection
            gsap.set(container.current, { 
                marginTop: -(container.current?.offsetHeight || 0) 
            });

            // 3. The Main Timeline
            gsap.timeline({
                scrollTrigger: {
                    trigger: img_container.current,
                    pin: img_container.current,
                    scrub: 1,
                    start: "0% 0%",
                }
            })
            // ZOOM Effect
            .to(img.current, { transform: "translateZ(2200px)" }) 
            // Text Moves Up & Fades Out
            .to(text1.current, { y: -300, opacity: 0 }, "<0.05") 
            .to(text2.current, { y: -300, opacity: 0 }, "<0.05") 
            // Content Slides Up from bottom
            .fromTo(container.current, 
                { yPercent: 100, scaleY: 2 }, 
                { yPercent: 0, scaleY: 1 } 
            ); 
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative">
            {/* BLACK BACKGROUND */}
            <div ref={bg1} className="bg-[#0b0b0b] absolute h-screen w-screen -z-10"></div>

            <section>
                <div ref={img_container} className="w-screen h-[100dvh] flex items-center justify-center overflow-hidden">
                    <div className="image-wrapper perspective relative flex items-center justify-center">

                        {/* Image - Colorful & Vibrant */}
                        <img 
                            ref={img} 
                            src={solar} 
                            className="masked-image brightness-100 contrast-110" 
                            alt="Solar Farm" 
                        />

                        {/* Center Text Overlay */}
                        <div className="absolute z-20 flex flex-col items-center justify-center text-center w-full px-4">

                            {/* Main Title: ENER (Hollow) + GICA (Solid) */}
                            <h1 
                                ref={text1} 
                                // UPDATED CLASSES HERE:
                                // 1. items-center justify-center: Centers alignment
                                // 2. whitespace-nowrap: Prevents line breaks
                                // 3. text-[12vw]: Fills circle better
                                // 4. gap-1: Tighter spacing on mobile
                                className="text-[12vw] md:text-[120px] font-black leading-none drop-shadow-2xl tracking-tighter flex items-center justify-center gap-1 md:gap-4 whitespace-nowrap"
                            >
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>
                                    ENER
                                </span>
                                <span className="text-white">
                                    GICA
                                </span>
                            </h1>

                            {/* Subtitle: SUSTAIN FOUNDATION */}
                            <h2 
                                ref={text2} 
                                className="mt-4 md:mt-6 text-[2.5vw] md:text-[20px] font-bold tracking-[0.3em] text-white drop-shadow-md"
                            >
                                SUSTAIN FOUNDATION
                            </h2>

                        </div>
                    </div>
                </div>

                {/* ContentSection linked via ref for GSAP slide-up */}
                <div className="last">
                    <ContentSection ref={container} />
                </div>
            </section>
        </div>
    );
};

export default HeroSection;