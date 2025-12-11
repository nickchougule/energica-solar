// src/components/about/MissionVision.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

// --- 1. UTILITY COMPONENTS ---

// A. Animated Counter (Counts up from 0 to value)
const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    // FIX: Changed margin from "-100px" to "-10px". 
    // This ensures the animation triggers on mobile even if the element is near the bottom of the screen.
    const inView = useInView(ref, { once: true, margin: "-10px" });
    
    useEffect(() => {
        if (inView && ref.current) {
            const controls = animate(0, value, {
                duration: 2,
                ease: [0.25, 1, 0.5, 1], // Luxury easing
                onUpdate: (latest) => {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(latest).toString() + suffix;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [inView, value, suffix]);

    return <span ref={ref} className="tabular-nums">0{suffix}</span>;
};

// B. Masked Text Reveal (Word by word slide-up)
const MaskedText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <div className={`${className} overflow-hidden flex flex-wrap gap-x-2 gap-y-1`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: "0%" }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ 
                            duration: 0.8, 
                            ease: [0.25, 1, 0.5, 1], 
                            delay: delay + (0.03 * i) 
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

// C. Spotlight Card (The "Crazy" Glow Effect)
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    const opacity = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        position.x.set(e.clientX - rect.left);
        position.y.set(e.clientY - rect.top);
    };

    const handleFocus = () => {
        setIsFocused(true);
        animate(opacity, 1, { duration: 0.2 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        animate(opacity, 0, { duration: 0.2 });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            // Responsive border radius
            className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#0a0a0a] ${className}`}
        >
            {/* The Spotlight Gradient moving with mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity,
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(40, 167, 69, 0.15), transparent 40%)`
                    ),
                }}
            />
            {/* The Border Spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl md:rounded-3xl transition duration-300"
                style={{
                    opacity,
                    background: useTransform(
                        [position.x, position.y],
                        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(40, 167, 69, 0.4), transparent 40%)`
                    ),
                }}
                // Mask composite to only show border
                css={{
                    "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                } as any}
            />
            
            {/* Content Layer */}
            <div className="relative z-20 h-full">{children}</div>
        </div>
    );
};


const MissionVision: React.FC = () => {
    return (
        <section className="w-full bg-[#050505] py-16 md:py-32 px-4 md:px-6 min-h-screen relative overflow-hidden">
            
            {/* GLOBAL NOISE OVERLAY */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* HEADER */}
                <div className="text-center mb-16 md:mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-3 py-1 md:px-4 md:py-2 bg-[#28a745]/10 border border-[#28a745]/30 rounded-full text-[#28a745] text-xs md:text-sm font-mono uppercase tracking-wider mb-4 md:mb-6"
                    >
                        Our Foundation
                    </motion.span>
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none break-words">
                        <MaskedText text="Mission & Vision" />
                    </h2>
                </div>

                {/* --- MISSION CARD --- */}
                <SpotlightCard className="mb-8 md:mb-12 p-6 sm:p-8 md:p-16 group">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        <div className="md:col-span-4">
                            <span className="text-[#28a745] font-mono text-lg md:text-xl uppercase tracking-widest block mb-2 md:mb-4">01. Purpose</span>
                            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                                MISSION
                            </h3>
                        </div>
                        <div className="md:col-span-8">
                            <MaskedText 
                                text="To bridge the critical gap between technical feasibility and financial viability in renewable energy projects. We drive sustainable infrastructure development across India, aligning with government schemes like PM Surya Ghar and KUSUM Yojana to ensure energy security for all." 
                                className="text-gray-300 text-lg sm:text-xl md:text-3xl leading-relaxed font-light"
                                delay={0.2}
                            />
                            
                            {/* Decorative Line */}
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                className="h-px w-full bg-gradient-to-r from-[#28a745] to-transparent mt-8 md:mt-12 origin-left"
                            />
                        </div>
                    </div>
                </SpotlightCard>

                {/* --- VISION CARD --- */}
                <SpotlightCard className="p-6 sm:p-8 md:p-16 group">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        {/* On mobile, Title (order-2) stacks naturally AFTER Content (order-1) if not overridden.
                            Here, we want Title FIRST on mobile (natural DOM order) and LAST on Desktop.
                            Since Title is defined first in DOM, mobile is correct.
                            On desktop, 'md:order-2' moves Title to the right, 'md:order-1' moves Content to left. 
                        */}
                        <div className="md:col-span-4 md:order-2">
                             <span className="text-[#28a745] font-mono text-lg md:text-xl uppercase tracking-widest block mb-2 md:mb-4">02. Future</span>
                             <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                                VISION
                            </h3>
                        </div>
                        <div className="md:col-span-8 md:order-1">
                            <MaskedText 
                                text="To be the most trusted technical and financial advisory in the renewable sector, recognized for our commitment to integrity and innovation, accelerating India's transition to 100% sustainable energy independence." 
                                className="text-gray-300 text-lg sm:text-xl md:text-3xl leading-relaxed font-light"
                                delay={0.2}
                            />
                            
                            {/* STATS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-8 mt-12 md:mt-16 border-t border-white/10 pt-8 md:pt-10">
                                <div>
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 flex">
                                        <Counter value={100} suffix="%" />
                                    </div>
                                    <p className="text-xs md:text-sm text-[#28a745] uppercase tracking-wider font-mono">Sustainable</p>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 flex">
                                        <span className="mr-1">#</span><Counter value={1} />
                                    </div>
                                    <p className="text-xs md:text-sm text-[#28a745] uppercase tracking-wider font-mono">Trusted Partner</p>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">∞</div>
                                    <p className="text-xs md:text-sm text-[#28a745] uppercase tracking-wider font-mono">Innovation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* BOTTOM ACCENT */}
                <div className="mt-16 md:mt-32 text-center opacity-50">
                    <div className="inline-flex items-center gap-2 md:gap-4 text-gray-500 text-xs md:text-sm">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            transition={{ duration: 1 }}
                            className="h-px bg-[#28a745] w-[30px] md:w-[60px]" 
                        />
                        <span className="font-mono uppercase tracking-widest whitespace-nowrap">Building India's Green Future</span>
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            transition={{ duration: 1 }}
                            className="h-px bg-[#28a745] w-[30px] md:w-[60px]" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MissionVision;