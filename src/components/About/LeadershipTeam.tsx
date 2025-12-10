// src/components/about/LeadershipTeam.tsx

import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// IMPORT LOCAL IMAGES
import CEOImg from "../About/CompanyRoles/CEO.webp";
import CTOImg from "../About/CompanyRoles/CTO.webp";
import DirectorImg from "../About/CompanyRoles/Direc.webp"; 
import HeadImg from "../About/CompanyRoles/Head.webp";

gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        id: "01",
        title: "Chief Executive Officer",
        role: "Strategic Vision",
        desc: "Leading the company's strategic direction, overseeing global operations, and driving sustainable growth in the renewable energy sector.",
        img: CEOImg
    },
    {
        id: "02",
        title: "Chief Technology Officer",
        role: "Innovation & Tech",
        desc: "Spearheading technological advancements, integrating AI-driven energy solutions, and ensuring our infrastructure remains at the cutting edge.",
        img: CTOImg
    },
    {
        id: "03",
        title: "Director of Operations",
        role: "Execution & Logistics",
        desc: "Managing large-scale project lifecycles, from land acquisition to grid synchronization, ensuring operational excellence and timely delivery.",
        img: DirectorImg
    },
    {
        id: "04",
        title: "Head of Infrastructure",
        role: "Grid & Assets",
        desc: "Overseeing the physical backbone of our energy networks, managing high-capacity substations, and ensuring asset reliability and compliance.",
        img: HeadImg
    }
];

const LeadershipTeam = forwardRef<HTMLDivElement>((props, ref) => {
    // We use this ref to calculate the mouse position relative to THIS section
    const containerRef = useRef<HTMLDivElement>(null); 
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorImgRef = useRef<HTMLImageElement>(null);
    const [activeImg, setActiveImg] = useState(data[0].img);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. List Entrance Animation
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

            // 2. Mouse Follower Logic
            if (cursorRef.current && containerRef.current) {
                // Center the cursor anchor point
                gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

                // We animate 'x' and 'y' (transforms) for best performance
                const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
                const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

                const moveCursor = (e: MouseEvent) => {
                    // CRITICAL FIX:
                    // We calculate mouse position RELATIVE to the container.
                    // This prevents the "double offset" issue when scrolling.
                    if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const relX = e.clientX - rect.left;
                        const relY = e.clientY - rect.top;
                        
                        xTo(relX);
                        yTo(relY);
                    }
                };

                // Add listener to the CONTAINER, not the window, so it tracks correctly inside
                containerRef.current.addEventListener("mousemove", moveCursor);
                // Also add to window to catch fast movements, but check bounds if needed.
                // For simplicity/robustness, window listener is okay if we use getBoundingClientRect inside.
                window.addEventListener("mousemove", moveCursor);

                return () => {
                    if (containerRef.current) {
                        containerRef.current.removeEventListener("mousemove", moveCursor);
                    }
                    window.removeEventListener("mousemove", moveCursor);
                };
            }

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
        <div ref={ref} className="bg-white text-black min-h-screen relative z-50 py-20 overflow-hidden cursor-none">
            
            {/* WRAPPER FOR RELATIVE CALCULATION */}
            <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10 relative">

                {/* FLOATING CURSOR IMAGE 
                    - position: absolute (relative to the containerRef above)
                    - top: 0, left: 0
                    - We move it using transforms (x, y) calculated from the container's bounding box.
                */}
                <div 
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-[350px] h-[220px] pointer-events-none z-50 rounded-lg overflow-hidden opacity-0 scale-0 shadow-2xl border-2 border-[#28a745]"
                >
                    <img 
                        ref={cursorImgRef}
                        src={activeImg} 
                        alt="Leader Profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* HEADER */}
                <div className="mb-20 border-b border-gray-200 pb-10">
                    <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-2">
                        The People Behind The Power
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black">
                        Leadership <span className="text-gray-300">Team</span>
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
                                <div className="flex items-baseline gap-8 md:w-3/5">
                                    <span className="font-mono text-gray-300 text-xl">/{item.id}</span>
                                    <h3 className="title text-3xl md:text-5xl font-bold uppercase transition-transform duration-300">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 md:w-2/5 justify-between">
                                    <span className="font-mono text-sm uppercase tracking-widest text-gray-500 font-semibold">
                                        {item.role}
                                    </span>
                                    <span className="arrow text-[#28a745] text-3xl opacity-0 transform -translate-x-4 transition-all">
                                        ↗
                                    </span>
                                </div>
                            </div>
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

export default LeadershipTeam;