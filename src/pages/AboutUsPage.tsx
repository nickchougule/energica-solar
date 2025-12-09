import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Text Reveal Animation (Paragraphs)
      const texts = gsap.utils.toArray(".reveal-text");
      texts.forEach((text: any) => {
        gsap.from(text, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%", // Start revealing when near bottom of screen
            toggleActions: "play none none reverse"
          }
        });
      });

      // 2. The Growing Green Line
      gsap.fromTo(lineRef.current, 
        { height: 0 },
        { 
            height: "100%", 
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top center",
                end: "bottom center",
                scrub: 1
            }
        }
      );

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-black text-white min-h-screen relative py-32 px-6 md:px-20 overflow-hidden">
        
        {/* Background Subtle Text */}
        <div className="absolute top-20 right-0 text-[20vw] font-black text-[#28a745]/5 pointer-events-none leading-none select-none">
            ABOUT
        </div>

        <div className="flex gap-10 md:gap-20 max-w-7xl mx-auto relative z-10">
            
            {/* LEFT: The Timeline Bar */}
            <div className="hidden md:flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#28a745] shadow-[0_0_20px_#28a745]"></div>
                <div className="w-[1px] bg-gray-800 h-full flex-grow relative">
                    <div ref={lineRef} className="absolute top-0 left-0 w-full bg-[#28a745] shadow-[0_0_10px_#28a745]"></div>
                </div>
            </div>

            {/* RIGHT: Content */}
            <div className="flex flex-col gap-24 pt-4">
                
                {/* 1. Introduction */}
                <div className="reveal-text">
                    <span className="text-[#28a745] font-mono tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
                    <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                        We don't just consult. <br/>
                        <span className="text-gray-500">We bridge the gap.</span>
                    </h2>
                </div>

                {/* 2. Detailed Story */}
                <div className="reveal-text max-w-3xl">
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                        At <span className="text-white font-bold">Energica Sustain Foundation</span>, we saw a disconnect. 
                        Engineers spoke one language, investors spoke another. 
                        Projects failed not because of bad tech, but because of bad translation.
                    </p>
                </div>

                {/* 3. The Solution */}
                <div className="reveal-text max-w-3xl ml-auto border-l-4 border-[#28a745] pl-8">
                    <p className="text-lg md:text-xl leading-relaxed text-gray-400 italic">
                        "A lender’s technical advisor plays a pivotal role in bridging the gap between 
                        technical feasibility and financial viability, ensuring that investments are sound 
                        [cite_start]and well-supported." [cite: 268]
                    </p>
                </div>

                {/* 4. Infrastructure Stats */}
                <div className="reveal-text grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-gray-800">
                    <div>
                        <h4 className="text-4xl font-bold text-[#28a745] mb-2">10+</h4>
                        <p className="text-xs uppercase tracking-widest text-gray-500">States Covered</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-[#28a745] mb-2">100+</h4>
                        <p className="text-xs uppercase tracking-widest text-gray-500">MW Supplied</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-[#28a745] mb-2">500+</h4>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Integrators Trained</p>
                    </div>
                    <div>
                        <h4 className="text-4xl font-bold text-[#28a745] mb-2">100%</h4>
                        <p className="text-xs uppercase tracking-widest text-gray-500">Commitment</p>
                    </div>
                </div>

            </div>
        </div>

    </div>
  );
};

export default AboutSection;