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
      
      // 1. Header Animation (Controlled reveal to prevent stretching look)
      gsap.from(".section-header-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 2. Initial Fade In for items
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

      // 3. Mouse Follower Setup
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power3" });

      const moveCursor = (e: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            
            xTo(relX);
            yTo(relY);
        }
      };

      const containerEl = containerRef.current;
      if (containerEl) {
          containerEl.addEventListener("mousemove", moveCursor);
      }

      return () => {
        if (containerEl) {
            containerEl.removeEventListener("mousemove", moveCursor);
        }
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Hover State
  const handleMouseEnter = (img: string, rowId: string) => {
    setActiveImg(img);
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    gsap.to(`.service-item-${rowId} .title`, { x: 20, color: "#28a745", duration: 0.3 });
    gsap.to(`.service-item-${rowId} .arrow`, { opacity: 1, x: 0, duration: 0.3 });
  };

  const handleMouseLeave = (rowId: string) => {
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    gsap.to(`.service-item-${rowId} .title`, { x: 0, color: "black", duration: 0.3 });
    gsap.to(`.service-item-${rowId} .arrow`, { opacity: 0, x: -20, duration: 0.3 });
  };

  return (
    <div ref={ref} className="bg-white text-black min-h-screen relative py-20 overflow-hidden cursor-none">
      
      {/* 1. FLOATING CURSOR IMAGE */}
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 w-[280px] h-[180px] pointer-events-none z-10 rounded-xl overflow-hidden opacity-0 scale-0 shadow-2xl border-2 border-white/50"
      >
        <img 
            ref={cursorImgRef}
            src={activeImg} 
            alt="Service Preview" 
            className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10 relative">
        
        {/* HEADER */}
        <div className="mb-20 border-b border-gray-200 pb-10 relative z-20">
            <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-2">
                Our Expertise
            </span>
            
            {/* FIX: Added specific class and 'will-change-transform' to prevent scroll stretching artifacts */}
            <h2 className="section-header-title text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-black will-change-transform">
                Advisory <span className="text-gray-300">Services</span>
            </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col relative z-20">
            {data.map((item, idx) => (
                <div 
                    key={idx}
                    className={`service-item service-item-${idx} group relative border-b border-gray-200 py-12 transition-colors hover:bg-transparent`}
                    onMouseEnter={() => handleMouseEnter(item.img, idx.toString())}
                    onMouseLeave={() => handleMouseLeave(idx.toString())}
                >
                    <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 relative z-30 pointer-events-none">
                        
                        {/* Number & Title */}
                        <div className="flex items-baseline gap-8 md:w-1/2">
                            <span className="font-mono text-gray-400 text-xl">/{item.id}</span>
                            <h3 className="title text-3xl md:text-5xl font-bold uppercase transition-transform duration-300 drop-shadow-sm">
                                {item.title}
                            </h3>
                        </div>

                        {/* Short Desc & Arrow */}
                        <div className="flex items-center gap-4 md:w-1/2 justify-between">
                            <span className="font-mono text-sm uppercase tracking-widest text-gray-500 font-semibold bg-white/80 backdrop-blur-md px-2 rounded">
                                {item.short}
                            </span>
                            <span className="arrow text-[#28a745] text-3xl opacity-0 transform -translate-x-4 transition-all">
                                ↗
                            </span>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-500 ease-in-out relative z-30 pointer-events-none">
                        <div className="pt-6 md:pl-[120px] max-w-3xl">
                            <p className="text-lg text-gray-800 leading-relaxed font-medium bg-white/60 backdrop-blur-sm p-2 rounded-lg inline-block">
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