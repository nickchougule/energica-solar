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
  
  // Track the active image for Desktop Cursor
  const [cursorImg, setCursorImg] = useState(data[0].img);
  // Track the active Item ID for Mobile Accordion
  const [activeId, setActiveId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.from(".section-header-title", {
        y: 30, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // 2. Initial Fade In
      gsap.from(".service-item", {
        y: 50, opacity: 0, duration: 1, stagger: 0.1,
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      });

      // 3. Mouse Follower (DESKTOP ONLY)
      if (isDesktop && cursorRef.current) {
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power3" });

        const moveCursor = (e: MouseEvent) => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            xTo(e.clientX - rect.left);
            yTo(e.clientY - rect.top);
          }
        };

        const containerEl = containerRef.current;
        if (containerEl) containerEl.addEventListener("mousemove", moveCursor);
        return () => { if (containerEl) containerEl.removeEventListener("mousemove", moveCursor); };
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- INTERACTION HANDLERS ---

  // Desktop Hover
  const handleMouseEnter = (img: string, rowId: string) => {
    if (window.innerWidth > 768) {
      setCursorImg(img);
      // On Desktop, hover acts as "active"
      setActiveId(rowId); 
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .title`, { x: 20, color: "#28a745", duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 1, x: 0, duration: 0.3 });
    }
  };

  // Desktop Leave
  const handleMouseLeave = (rowId: string) => {
    if (window.innerWidth > 768) {
      setActiveId(null);
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(`.service-item-${rowId} .title`, { x: 0, color: "black", duration: 0.3 });
      gsap.to(`.service-item-${rowId} .arrow`, { opacity: 0, x: -20, duration: 0.3 });
    }
  };

  // Mobile Click (Tap)
  const handleClick = (rowId: string) => {
    if (window.innerWidth <= 768) {
      // Toggle logic: If clicking the open one, close it. Otherwise open new one.
      setActiveId(prev => prev === rowId ? null : rowId);
    }
  };

  return (
    <div ref={ref} className="bg-white text-black min-h-screen relative py-12 md:py-20 overflow-hidden md:cursor-none">
      
      {/* 1. FLOATING CURSOR IMAGE (DESKTOP ONLY - Hidden on Mobile) */}
      <div 
        ref={cursorRef}
        className="hidden md:block absolute top-0 left-0 w-[280px] h-[180px] pointer-events-none z-10 rounded-xl overflow-hidden opacity-0 scale-0 shadow-2xl border-2 border-white/50"
      >
        <img 
          src={cursorImg} 
          alt="Service Preview" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">
        
        {/* HEADER */}
        <div className="mb-12 md:mb-20 border-b border-gray-200 pb-6 md:pb-10 relative z-20">
            <span className="text-[#28a745] font-mono tracking-widest text-xs md:text-sm uppercase font-bold block mb-2">
                Our Expertise
            </span>
            <h2 className="section-header-title text-[11vw] md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-black will-change-transform break-words">
                Advisory <span className="text-gray-300">Services</span>
            </h2>
        </div>

        {/* LIST */}
        <div className="flex flex-col relative z-20">
            {data.map((item, idx) => (
                <div 
                    key={idx}
                    // Added onClick for Mobile Interaction
                    onClick={() => handleClick(idx.toString())} 
                    className={`service-item service-item-${idx} group relative border-b border-gray-200 py-6 md:py-12 transition-colors duration-300
                      ${activeId === idx.toString() ? 'bg-gray-50' : 'bg-transparent'} 
                      hover:bg-transparent cursor-pointer`}
                    onMouseEnter={() => handleMouseEnter(item.img, idx.toString())}
                    onMouseLeave={() => handleMouseLeave(idx.toString())}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4 md:gap-6 relative z-30 pointer-events-none">
                        
                        {/* Number & Title */}
                        <div className="flex items-baseline gap-4 md:gap-8 md:w-1/2 w-full">
                            <span className={`font-mono text-lg md:text-xl transition-colors ${activeId === idx.toString() ? 'text-[#28a745]' : 'text-gray-400'}`}>/{item.id}</span>
                            <h3 className={`title text-2xl sm:text-3xl md:text-5xl font-bold uppercase transition-all duration-300 drop-shadow-sm leading-tight
                              ${activeId === idx.toString() ? 'text-[#28a745] translate-x-2' : 'text-black'}`}>
                                {item.title}
                            </h3>
                        </div>

                        {/* Short Desc & Arrow */}
                        <div className="flex items-center gap-4 md:w-1/2 justify-between w-full pl-10 md:pl-0">
                            <span className="font-mono text-[10px] md:text-sm uppercase tracking-widest text-gray-500 font-semibold bg-white/80 md:backdrop-blur-md px-2 rounded">
                                {item.short}
                            </span>
                            {/* Mobile Indicator Arrow (Rotates when active) */}
                            <span className={`md:hidden text-2xl transition-transform duration-300 ${activeId === idx.toString() ? 'rotate-90 text-[#28a745]' : 'text-gray-300'}`}>
                              →
                            </span>
                            {/* Desktop Hover Arrow */}
                            <span className="arrow text-[#28a745] text-2xl md:text-3xl opacity-0 transform -translate-x-4 transition-all hidden md:block">
                                ↗
                            </span>
                        </div>
                    </div>

                    {/* Expandable Details + MOBILE IMAGE */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out relative z-30 
                      ${activeId === idx.toString() ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
                    >
                        <div className="pt-2 md:pt-6 pl-0 md:pl-[120px] max-w-3xl">
                            
                            {/* --- MOBILE IMAGE (Visible only on small screens when active) --- */}
                            <div className="block md:hidden w-full h-[200px] mb-4 rounded-lg overflow-hidden relative">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                              {/* Overlay to ensure text readability if needed */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <p className="text-sm md:text-lg text-gray-800 leading-relaxed font-medium bg-white/60 md:backdrop-blur-sm p-2 rounded-lg inline-block">
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