import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const services = [
  {
    id: "01",
    title: "Project Consultation",
    subtitle: "Private & Government",
    desc: "Comprehensive advisory services ensuring policy compliance and technical excellence. We specialize in feasibility studies, Detailed Project Reports (DPR), tender support, and end-to-end guidance for both private enterprises and government bodies.",
  },
  {
    id: "02",
    title: "Distressed Assets",
    subtitle: "Renewable Sector",
    desc: "Strategic assessment and restructuring for underperforming renewable energy projects. We conduct rigorous technical due diligence and implement financial and operational revival strategies to turn liabilities into assets.",
  },
  {
    id: "03",
    title: "Infrastructure Dev",
    subtitle: "Large-Scale Execution",
    desc: "End-to-end planning, design, and execution support for massive infrastructure initiatives. Our expertise covers Solar Parks, high-capacity transmission upgrades, EV charging infrastructure, and public utility integration.",
  },
  {
    id: "04",
    title: "Energy Contracts",
    subtitle: "Legal & Technical",
    desc: "Expert assistance in drafting, reviewing, and managing critical energy contracts. We handle EPC (Engineering, Procurement, Construction), O&M (Operations & Maintenance), and PPA (Power Purchase Agreements) to ensure smooth execution.",
  },
  {
    id: "05",
    title: "Asset Revival",
    subtitle: "Optimization & Repowering",
    desc: "Technical solutions to bring defunct or low-output assets back to productive operation. We focus on repowering old plants, repairing critical components, refinancing strategies, and performance optimization.",
  }
];

const Consultation = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      const tl = gsap.timeline();
      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      });

      // 2. LIST ANIMATION
      const items = gsap.utils.toArray<HTMLElement>(".service-row");
      
      items.forEach((item) => {
        const line = item.querySelector(".separator");
        const id = item.querySelector(".service-id");
        const title = item.querySelector(".service-title");
        const desc = item.querySelector(".service-desc");

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%", 
            toggleActions: "play none none reverse"
          }
        });

        rowTl.fromTo(line, 
          { scaleX: 0, transformOrigin: "left" }, 
          { scaleX: 1, duration: 1, ease: "expo.out" }
        );

        rowTl.from([id, title, desc], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.8");
      });

    }, container);

    // --- FOOTER SAFETY FIX ---
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={container} className="bg-[#0b0b0b] text-white min-h-screen relative z-10 overflow-hidden pt-24 md:pt-32 pb-20 px-4 sm:px-6 md:px-12">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#28a745]/10 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}></div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-24 md:mb-48">
          <div className="overflow-hidden">
            {/* FIX: Changed text-5xl to text-[10vw] for fluid mobile scaling */}
            <h1 className="hero-line text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-6">
              Consultation <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28a745] to-emerald-600">
                & Strategy
              </span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="hero-line text-base sm:text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed border-l-2 border-[#28a745] pl-6 mt-6 md:mt-8">
              Expert advisory services for private & government sectors. We turn complex energy challenges into streamlined, profitable infrastructure.
            </p>
          </div>
        </div>

        {/* --- SERVICE LIST --- */}
        <div className="w-full">
          {services.map((service, index) => (
            <div key={index} className="service-row group relative py-12 md:py-24">
              
              {/* Animated Separator */}
              <div className="separator absolute top-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-[#28a745] transition-colors duration-500"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-start">
                
                {/* Column 1: Index */}
                <div className="md:col-span-2 mb-2 md:mb-0">
                  <span className="service-id block text-base md:text-lg font-mono text-[#28a745]">
                    /{service.id}
                  </span>
                </div>

                {/* Column 2: Title */}
                <div className="md:col-span-5 mb-4 md:mb-0">
                  <h2 className="service-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-none group-hover:text-gray-200 transition-colors">
                    {service.title}
                  </h2>
                  <span className="service-title block mt-2 font-mono text-xs md:text-sm tracking-widest text-gray-500 uppercase">
                    [{service.subtitle}]
                  </span>
                </div>

                {/* Column 3: Description & Action */}
                <div className="md:col-span-5 flex flex-col justify-between h-full">
                  <p className="service-desc text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-6 md:mb-8">
                    {service.desc}
                  </p>
                  
                  <div className="service-desc flex items-center gap-4 text-[#28a745] group-hover:translate-x-4 transition-transform duration-300 cursor-pointer">
                    <span className="text-sm font-bold uppercase tracking-widest">Learn More</span>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          <div className="w-full h-[1px] bg-white/20"></div>
        </div>

        {/* --- QR CODE SECTION --- */}
        <div className="mt-24 md:mt-32 flex flex-col md:flex-row items-center justify-between bg-[#111] p-8 md:p-12 rounded-3xl border border-white/5 gap-8 md:gap-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold uppercase mb-2">Ready to Start?</h3>
            <p className="text-gray-400 text-sm font-mono">Scan to connect with our advisory board.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-mono text-[#28a745] tracking-widest mb-1">SECURE LINK</span>
              <span className="block text-xl font-bold">SCAN CODE</span>
            </div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center p-2 shadow-lg shadow-white/5">
                <div className="w-full h-full bg-black/10 flex items-center justify-center">
                    <span className="text-[10px] text-black font-mono text-center leading-tight">QR<br/>CODE</span>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Consultation;