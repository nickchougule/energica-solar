import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- 1. REUSABLE ANIMATION HELPERS ---
const revealVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
        y: "0%",
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.05 * i }
    })
};

const MaskedText = ({ text, className = "" }: { text: string, className?: string }) => {
    const words = text.split(" ");
    return (
        <div className={`overflow-hidden ${className} flex flex-wrap gap-x-2`}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden relative inline-block">
                    <motion.span
                        custom={i}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    );
};

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // --- 2. PAGE ENTRANCE ANIMATION (GSAP) ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. Page Slide Up
            gsap.fromTo(containerRef.current, 
                { autoAlpha: 0, y: 50 },
                { 
                    autoAlpha: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: "power4.out",
                    onComplete: () => ScrollTrigger.refresh()
                }
            );

            // 2. Form Input Stagger
            gsap.from(".contact-input", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });

            // 3. Map Reveal
            gsap.from(".map-container", {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".map-container",
                    start: "top 85%",
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0b0b0b] text-white min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden invisible">
            
            {/* BACKGROUND NOISE */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-overlay" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <div className="mb-20">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-[#28a745] font-mono tracking-[0.2em] text-sm uppercase font-bold block mb-4"
                    >
                        Get In Touch
                    </motion.span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                        <MaskedText text="Let's Build The" />
                        <span className="block text-gray-500">
                             <MaskedText text="Future Together." />
                        </span>
                    </h1>
                </div>

                {/* --- CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
                    
                    {/* LEFT: INFO */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Contact Details</h3>
                            <p className="text-2xl md:text-3xl font-bold leading-tight mb-2">connect@solarbni.com</p>
                            <p className="text-xl text-gray-400">+91 77700 11558</p>
                            <p className="text-xl text-gray-400">+91 77198 18283</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Headquarters</h3>
                            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-sm">
                                Xion Mall,<br />
                                Hinjewadi, Wakad Road,<br />
                                Pune, Maharashtra 411057
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-6">Socials</h3>
                            <div className="flex gap-8">
                                {["LinkedIn", "Twitter", "Instagram"].map((social, i) => (
                                    <a key={i} href="#" className="text-lg hover:text-[#28a745] transition-colors uppercase font-bold tracking-wider">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: FORM */}
                    <form className="space-y-8">
                        {["Name", "Email", "Subject"].map((label, i) => (
                            <div key={i} className="contact-input relative group">
                                <input 
                                    type={label === "Email" ? "email" : "text"} 
                                    placeholder={label}
                                    className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-600 text-white"
                                />
                            </div>
                        ))}
                        
                        <div className="contact-input relative group">
                            <textarea 
                                rows={4}
                                placeholder="Message"
                                className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-[#28a745] transition-colors placeholder:text-gray-600 text-white resize-none"
                            ></textarea>
                        </div>

                        <div className="contact-input pt-4">
                            <button className="px-10 py-4 border border-[#28a745] text-[#28a745] font-bold uppercase tracking-widest hover:bg-[#28a745] hover:text-white transition-all duration-300">
                                Send Message
                            </button>
                        </div>
                    </form>

                </div>

                {/* --- MAP SECTION --- */}
                {/* UPDATED: Used specific Google Maps Embed for "Xion Mall Hinjewadi".
                    CSS Filter Trick: 'grayscale(100%) invert(92%)' makes the light map look Dark Mode.
                    Hover Effect: Removes filter to show full color map.
                */}
                <div className="map-container group w-full h-[500px] rounded-3xl overflow-hidden relative border border-white/10 transition-all duration-500">
                    <iframe 
                        src="https://maps.google.com/maps?q=Xion+Mall+Hinjewadi+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%" 
                        height="100%" 
                        className="w-full h-full border-0 filter grayscale invert contrast-[0.85] brightness-[0.8] transition-all duration-700 group-hover:filter-none group-hover:invert-0 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Energica Office Map"
                    ></iframe>
                    
                    {/* Dark Overlay that fades out on hover */}
                    <div className="absolute inset-0 bg-[#0b0b0b]/30 pointer-events-none mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;