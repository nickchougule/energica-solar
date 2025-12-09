import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/Energica.png';

const navItems = [
  { name: "About Us", id: "about" },
  { name: "Awareness Campaigns", id: "schemes" },
  { name: "Training Campaigns", id: "training" },
  { name: "Consultation", id: "consultation" },
  { name: "Contact Us", id: "contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.to(menuRef.current, { y: 0, duration: 1, ease: "power4.inOut" });
      tl.from(".menu-link", { y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5");
      (menuRef.current as any).animation = tl;
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    const tl = (menuRef.current as any)?.animation;
    if (tl) {
      if (!isOpen) tl.play();
      else tl.reverse();
    }
    setIsOpen(!isOpen);
  };

  const handleScroll = (id: string) => {
    toggleMenu();
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <div ref={containerRef}>
      {/* TRANSPARENT NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-4 bg-transparent text-white">
        
        {/* LOGO ONLY */}
        <div className="cursor-pointer" onClick={() => handleScroll('home')}>
             <img 
                src={logo} 
                alt="Energica Logo" 
                className="h-20 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
             />
        </div>

        {/* HAMBURGER BUTTON (White on Black) */}
        <button onClick={toggleMenu} className="z-[100] group flex flex-col gap-1.5 cursor-pointer p-2 bg-black/50 backdrop-blur-md rounded-md border border-white/10">
          <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </nav>

      {/* FULL SCREEN MENU - BLACK BACKGROUND */}
      <div ref={menuRef} className="fixed top-0 left-0 w-screen h-screen bg-[#0b0b0b] text-white z-[90] flex flex-col justify-center items-center translate-y-[-100%]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <ul className="flex flex-col gap-6 text-center z-10 w-full max-w-xl">
          {navItems.map((item, idx) => (
            <li key={idx} className="overflow-hidden w-full">
                <button 
                    onClick={() => handleScroll(item.id)} 
                    className="menu-link block w-full text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-[#28a745] transition-colors"
                >
                    {item.name}
                </button>
            </li>
          ))}
        </ul>

        
      </div>
    </div>
  );
};

export default Navbar;

