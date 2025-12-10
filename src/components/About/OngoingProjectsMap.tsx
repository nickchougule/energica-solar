// src/components/about/OngoingProjectsMap.tsx

// FIX: Added 'useLayoutEffect' to the import list
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ENRICHMENT ---
const projects = [
    { city: "SANGLI", type: "WIND-SOLAR HYBRID", mw: 100, lat: "16.8524° N", lng: "74.5815° E" },
    { city: "SATARA", type: "SOLAR PV PROJECT", mw: 100, lat: "17.6887° N", lng: "74.0057° E" },
    { city: "SOLAPUR", type: "CUMULATIVE SOLAR", mw: 25, lat: "17.6701° N", lng: "75.9010° E" },
    { city: "PUNE", type: "SOLAR PV PROJECT", mw: 1, lat: "18.5246° N", lng: "73.8786° E" },
];

// --- 1. SPECIAL EFFECTS COMPONENTS ---

// A. Scramble Text Effect
const ScrambleText = ({ text, active }: { text: string, active: boolean }) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const [display, setDisplay] = useState(text);
    
    useEffect(() => {
        let interval: any;
        if (active) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplay(prev => 
                    text.split("").map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 2; 
            }, 30);
        } else {
            setDisplay(text);
        }
        return () => clearInterval(interval);
    }, [active, text]);

    return <span className="font-mono text-xs text-[#28a745] tracking-widest">{display}</span>;
};

// B. Rolling Number Counter
const Counter = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const controls = animate(0, value, {
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (latest) => {
                if (ref.current) ref.current.textContent = Math.floor(latest).toFixed(0);
            }
        });
        return () => controls.stop();
    }, [value]);

    return <span ref={ref}>{value}</span>;
};

// C. 3D Tilt Card
const TiltCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-[400px] w-full rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden group perspective-1000"
        >
            <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                {children}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </motion.div>
    );
};


const OngoingProjectsMap = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // useLayoutEffect is now correctly imported
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".proj-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-white text-gray-900 py-32 px-6 md:px-10 min-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* SECTION HEADER */}
                <div className="mb-24">
                    <span className="proj-header inline-block text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold mb-4">
                        Grid Infrastructure
                    </span>
                    <h2 className="proj-header text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
                        Active <span className="text-gray-300">Sites.</span>
                    </h2>
                </div>

                {/* THE BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <TiltCard index={index}>
                                {/* Top: Coordinates */}
                                <div className="w-full flex justify-between items-start border-b border-gray-100 pb-6 mb-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${hoveredIndex === index ? 'bg-[#28a745] animate-pulse' : 'bg-gray-300'}`}></div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Feed</span>
                                        </div>
                                        <div className="mt-2">
                                            <ScrambleText text={project.lat} active={hoveredIndex === index} />
                                            <br />
                                            <ScrambleText text={project.lng} active={hoveredIndex === index} />
                                        </div>
                                    </div>
                                    
                                    {/* Icon */}
                                    <div className="text-gray-200 group-hover:text-[#28a745] transition-colors duration-500">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* Middle: Capacity Counter */}
                                <div className="flex-grow flex flex-col justify-center">
                                    <div className="flex items-baseline">
                                        <span className="text-7xl md:text-8xl font-black tracking-tighter text-gray-900 group-hover:text-[#28a745] transition-colors duration-300">
                                            <Counter value={project.mw} />
                                        </span>
                                        <span className="text-xl font-bold text-gray-400 ml-2">MW</span>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400 uppercase mt-2">
                                        Total Capacity
                                    </span>
                                </div>

                                {/* Bottom: Project Name */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h3 className="text-3xl font-bold uppercase leading-none mb-1">
                                        {project.city}
                                    </h3>
                                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                                        {project.type}
                                    </p>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-20 flex justify-between items-end border-t border-gray-200 pt-8">
                    <p className="text-xs text-gray-400 font-mono w-1/3">
                        *Data represents currently active sites under Energica management.
                    </p>
                    <div className="text-right">
                        <span className="block text-4xl font-black text-gray-900">
                            {projects.reduce((acc, curr) => acc + curr.mw, 0)} <span className="text-[#28a745]">MW</span>
                        </span>
                        <span className="text-xs font-mono uppercase text-gray-400">Total Generation</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OngoingProjectsMap;