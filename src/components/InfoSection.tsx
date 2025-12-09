import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const InfoSection = () => {
  const container = useRef<HTMLDivElement>(null);
  
  // The specific text from the PDF 
  const text = "A lender’s technical advisor plays a pivotal role in bridging the gap between technical feasibility and financial viability, ensuring that investments are sound and well-supported.";
  
  // Split text into words for the Rejouice-style animation
  const words = text.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Target all elements with class 'word'
      gsap.from(".word", {
        opacity: 0.1, // Start dim, not invisible (premium feel)
        y: 50,        // Slide up from below
        rotationX: -90, // slight 3D rotation for style
        filter: "blur(10px)", // Start blurry
        duration: 1.2,
        stagger: 0.05, // The delay between each word (Rejouice effect)
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%", 
          end: "bottom 80%",
          scrub: 1, // Connect animation to scroll bar movement (smoother)
        }
      });

      // Animate the divider line
      gsap.from(".divider", {
        scaleX: 0,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
            trigger: container.current,
            start: "top 70%"
        }
      });

    }, container);

    return () => ctx.revert();
  }, []);

  // Function to determine if a word should be highlighted green
  const isHighlight = (word: string) => {
    const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
    const highlights = ["pivotal", "feasibility", "viability", "sound", "investments"];
    return highlights.includes(cleanWord);
  }

  return (
    <div 
      ref={container} 
      className="bg-[#0b0b0b] text-white min-h-[60vh] w-full flex flex-col justify-center items-center px-6 md:px-32 py-32 border-t border-gray-900 relative overflow-hidden"
    >
      <div className="max-w-6xl text-center z-10 relative">
        
        {/* Label */}
        <div className="mb-12 overflow-hidden">
            <span className="divider inline-block text-[#28a745] font-mono tracking-[0.3em] text-xs uppercase">
                Expert Insight
            </span>
        </div>

        {/* The Rejouice Text Block */}
        <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] md:leading-[1.3] text-white tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, index) => (
            <span 
                key={index} 
                className={`word inline-block transform-gpu ${isHighlight(word) ? 'text-[#28a745]' : 'text-gray-200'}`}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Bottom decorative line */}
        <div className="divider w-32 h-[2px] bg-[#28a745] mx-auto mt-16 rounded-full"></div>

      </div>
    </div>
  );
};

export default InfoSection;