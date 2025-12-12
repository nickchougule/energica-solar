import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Energica.png';

const navItems = [
    { name: "About Us", id: "about", path: "/about" },
    { name: "Awareness Campaigns", id: "schemes" , path:"/awarenesscompaign" },
    { name: "Training Campaigns", id: "training",path:"/Training" },
    { name: "Consultation", id: "consultation",path:"/consultation" },
    { name: "Contact Us", id: "contact", path: "/contact" } 
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false); // Controls navbar visibility
    const menuRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    // 1. SMART SCROLL LOGIC
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        
        // If we are at the very top, always show navbar
        if (latest < 50) {
            setIsHidden(false);
        } 
        // If scrolling DOWN and not at top -> Hide
        else if (latest > previous && latest > 50) {
            setIsHidden(true);
        } 
        // If scrolling UP -> Show
        else if (latest < previous) {
            setIsHidden(false);
        }
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                paused: true,
                defaults: { duration: 0.8, ease: "power4.inOut" }
            });

            tl.to(menuRef.current, {
                x: 0,
                skewX: 0,
                opacity: 1,
            });

            tl.from(".menu-link-item", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
            }, "-=0.4");

            (menuRef.current as any).animation = tl;
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const toggleMenu = () => {
        const tl = (menuRef.current as any)?.animation;
        if (tl) {
            if (!isOpen) {
                gsap.set(menuRef.current, { x: "100%", skewX: -10, opacity: 0 });
                tl.play();
            } else {
                tl.reverse();
            }
        }
        setIsOpen(!isOpen);
    };

    const navigateTo = (path?: string, id?: string, shouldToggle = true) => {
        if (shouldToggle) {
            toggleMenu();
        }

        setTimeout(() => {
            if (path) navigate(path);

            if (id && location.pathname === "/" && path === "/") {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo(0, 0);
            }
        }, 600);
    };

    return (
        <div ref={containerRef}>
            {/* 2. ANIMATED NAVBAR CONTAINER 
               We use `motion.nav` to animate the Y position based on `isHidden`.
            */}
            <motion.nav 
                className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-4 bg-transparent text-white"
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" }, // Slide up out of view
                }}
                animate={isHidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >

                {/* Logo */}
                <motion.div
                    onClick={() => navigateTo("/", "home", false)}
                    className="cursor-pointer z-[100]"
                    whileHover={{ scale: 1.05 }}
                >
                    {/* 3. RESPONSIVE LOGO SIZE: h-12 (48px) on mobile, h-20 (80px) on desktop */}
                    <img src={logo} className="h-12 md:h-20 w-auto object-contain" alt="Logo" />
                </motion.div>

                {/* Hamburger */}
                <motion.button
                    onClick={toggleMenu}
                    className="z-[100] group flex flex-col gap-1.5 cursor-pointer p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                >
                    <span className="w-8 h-[2px] bg-[#28a745]"></span>
                    <span className="w-8 h-[2px] bg-[#28a745]"></span>
                    <span className="w-8 h-[2px] bg-[#28a745]"></span>
                </motion.button>
            </motion.nav>

            {/* Full-screen menu */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 w-screen h-screen bg-[#0b0b0b] text-white z-[90] flex flex-col justify-center items-center opacity-0 translate-x-[100%]"
            >
                <ul className="flex flex-col gap-3 w-full max-w-2xl px-10 md:px-20">
                    {navItems.map((item, idx) => (
                        <li key={idx} className="overflow-hidden">
                            <motion.button
                                onClick={() => navigateTo(item.path, item.id)}
                                className="menu-link-item block w-full text-4xl md:text-5xl font-bold uppercase tracking-tighter text-left py-3 group relative"
                            >
                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#28a745] group-hover:w-full transition-all duration-300"></span>
                                <span className="relative text-white/90 group-hover:text-[#28a745] transition-colors duration-200">
                                    {item.name}
                                </span>
                            </motion.button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;