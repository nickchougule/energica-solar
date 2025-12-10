import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// IMPORT LOCAL IMAGES
import PowerConnection from "../assets/PowerConnection.avif";
import advise from "../assets/DistressedSolar.webp";
import land from "../assets/land.avif";
import contracts from "../assets/contracts.avif";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "01",
    title: "Distressed Assets",
    short: "Revival Strategies",
    desc: "Feasibility studies for reconstructing distressed assets. We assess market conditions, technical status, and financial viability to calculate ROI and minimize risks.",
    img: advise
  },
  {
    id: "02",
    title: "Infra Development",
    short: "Design & Execution",
    desc: "End-to-end execution from site selection to commissioning. We handle permits, construction, and technology installation for seamless renewable energy integration.",
    img: PowerConnection
  },
  {
    id: "03",
    title: "Land Procurement",
    short: "Site Selection",
    desc: "Strategic land acquisition near substations to minimize transmission costs. We ensure regulatory compliance and handle environmental impact assessments.",
    img: land
  },
  {
    id: "04",
    title: "Energy Contracts",
    short: "Drafting & Advisory",
    desc: "Expert drafting of CapEx and OpEx proposals. Our third-party consultation ensures thorough evaluation to optimize financial and operational decisions.",
    img: contracts
  }
];

const ContentSection = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  const [activeImg, setActiveImg] = useState(data[0].img);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Initial Fade In of the List
      gsap.from(".service-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      // 2. Mouse Follower Setup
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

      const moveCursor = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Hover State
  const handleMouseEnter = (img: string, rowId: string) => {
    setActiveImg(img);
    // Scale UP the cursor image
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    // Highlight the active row text
    gsap.to(`.service-item-${rowId} .title`, { x: 20, color: "#28a745", duration: 0.3 });
    gsap.to(`.service-item-${rowId} .arrow`, { opacity: 1, x: 0, duration: 0.3 });
  };

  const handleMouseLeave = (rowId: string) => {
    // Scale DOWN the cursor image
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    // Reset row text
    gsap.to(`.service-item-${rowId} .title`, { x: 0, color: "black", duration: 0.3 });
    gsap.to(`.service-item-${rowId} .arrow`, { opacity: 0, x: -20, duration: 0.3 });
  };

  return (
    <div ref={ref} className="bg-white text-black min-h-screen relative z-50 py-20 overflow-hidden cursor-none">
      
      {/* 1. FLOATING CURSOR IMAGE (Hidden by default, appears on hover) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-50 rounded-lg overflow-hidden transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 shadow-2xl"
      >
        <img 
            ref={cursorImgRef}
            src={activeImg} 
            alt="Service Preview" 
            className="w-full h-full object-cover"
        />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* HEADER */}
        <div className="mb-20 border-b border-gray-200 pb-10">
            <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-2">
                Our Expertise
            </span>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-black">
                Advisory <span className="text-gray-300">Services</span>
            </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col">
            {data.map((item, idx) => (
                <div 
                    key={idx}
                    className={`service-item service-item-${idx} group relative border-b border-gray-200 py-12 transition-colors hover:bg-gray-50`}
                    onMouseEnter={() => handleMouseEnter(item.img, idx.toString())}
                    onMouseLeave={() => handleMouseLeave(idx.toString())}
                >
                    <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 relative z-10">
                        
                        {/* Number & Title */}
                        <div className="flex items-baseline gap-8 md:w-1/2">
                            <span className="font-mono text-gray-300 text-xl">/{item.id}</span>
                            <h3 className="title text-3xl md:text-5xl font-bold uppercase transition-transform duration-300">
                                {item.title}
                            </h3>
                        </div>

                        {/* Short Desc & Arrow */}
                        <div className="flex items-center gap-4 md:w-1/2 justify-between">
                            <span className="font-mono text-sm uppercase tracking-widest text-gray-500">
                                {item.short}
                            </span>
                            <span className="arrow text-[#28a745] text-3xl opacity-0 transform -translate-x-4 transition-all">
                                ↗
                            </span>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-500 ease-in-out">
                        <div className="pt-6 md:pl-[120px] max-w-3xl">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </div>
  );
});

export default ContentSection;