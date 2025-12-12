import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const solarTech = [
  {
    title: "Current Technology",
    desc: "Modern solar uses high-efficiency mono/bifacial modules, microinverters, hybrid inverters, lithium batteries, smart monitoring, AI-based maintenance and IoT-enabled energy management.",
    tags: ["Mono/Bifacial", "AI Maintenance", "IoT"]
  },
  {
    title: "Grid-Tied System",
    desc: "Solar system connected directly to the utility grid; no batteries; excess energy exported. Ideal for homes/industries wanting reduced bills through net metering.",
    tags: ["Net Metering", "Zero Battery"]
  },
  {
    title: "Off-Grid System",
    desc: "Standalone solar setup with batteries; works without grid; provides backup in remote/rural areas where grid supply is weak or unavailable.",
    tags: ["Battery Backup", "Remote Access"]
  }
];

const newTech = [
  {
    title: "Hybrid Inverters",
    desc: "Combine solar + grid + battery functionality. Allow backup, peak shaving, smart energy management and work in both on-grid and off-grid modes."
  },
  {
    title: "Microinverters",
    desc: "Module-level inverters installed behind each panel. Improve efficiency, eliminate string losses, enhance safety (no high DC voltage) and offer panel-wise monitoring."
  },
  {
    title: "Lithium-ion Batteries",
    desc: "Advanced storage with long life, high efficiency, fast charging, deep cycle capability, and compact size. Ideal for hybrid and off-grid systems."
  }
];

const capacityBuilding = [
  {
    title: "Sustainability",
    desc: "Emphasis on eco-friendly practices, renewable energy adoption, waste reduction, resource optimization, and long-term environmental responsibility."
  },
  {
    title: "Administration",
    desc: "Improving organizational workflows, documentation, communication systems, coordination processes, and overall operational management."
  },
  {
    title: "Accounting",
    desc: "Training in financial management, budgeting, bookkeeping, auditing, compliance, and digital accounting tools for transparent operations."
  }
];

const TrainingCampaign = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO TEXT DECODE EFFECT
      gsap.from(".hero-char", {
        opacity: 0,
        y: 50,
        rotateX: 90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: container.current, start: "top 80%" }
      });

      // 2. THE "CIRCUIT LINE" DRAWING ANIMATION
      // This targets all horizontal separators
      gsap.utils.toArray<HTMLElement>(".circuit-line").forEach(line => {
        gsap.fromTo(line, 
          { scaleX: 0, transformOrigin: "left" },
          { 
            scaleX: 1, 
            duration: 1.5, 
            ease: "expo.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
            }
          }
        );
      });

      // 3. TEXT REVEAL (Tech Spec Style)
      gsap.utils.toArray<HTMLElement>(".spec-row").forEach(row => {
        gsap.from(row.querySelectorAll(".spec-content"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        });
      });

    }, container);

    // Refresh for sticky footer safety
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);

  return (
    <div ref={container} className="bg-[#050505] text-white min-h-screen relative z-10 overflow-hidden py-24 px-4 md:px-12 font-sans selection:bg-[#28a745] selection:text-black">
      
      {/* Subtle Grid Background (The Blueprint Look) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">

        {/* --- HERO SECTION --- */}
        <div className="mb-32 md:mb-48 pt-10">
          <div className="flex flex-col border-l border-[#28a745]/50 pl-6 md:pl-10">
            <span className="hero-char font-mono text-[#28a745] text-sm tracking-[0.2em] mb-4 block">
              // EDUCATIONAL_MODULES_V.2.0
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Training <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Campaigns</span>
            </h1>
            <p className="hero-char text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Empowering the next generation of energy integrators through advanced technical workshops, policy framework analysis, and hands-on operational training.
            </p>
            
            {/* Status Indicators */}
            <div className="flex gap-6 mt-10 font-mono text-xs text-gray-500">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse"></div> SYSTEM: ONLINE</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse"></div> MODE: OFFLINE</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse"></div> LAB: HANDS-ON</span>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: SOLAR TECH (The Spec Sheet Layout) --- */}
        <div className="mb-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Current <span className="text-[#28a745]">Technology</span></h2>
            <span className="hidden md:block font-mono text-gray-600">01 / 03</span>
          </div>

          <div className="border-t border-white/20">
            {solarTech.map((item, idx) => (
              <div key={idx} className="spec-row group relative border-b border-white/10 hover:border-[#28a745] transition-colors duration-500">
                {/* Hover Background Highlight */}
                <div className="absolute inset-0 bg-[#28a745]/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 lg:py-16 relative z-10 px-2 lg:px-6">
                  {/* Index */}
                  <div className="spec-content lg:col-span-1 font-mono text-[#28a745]/60 text-sm">
                    {`0${idx + 1}`}
                  </div>
                  
                  {/* Title */}
                  <div className="spec-content lg:col-span-4">
                    <h3 className="text-2xl md:text-4xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag, t) => (
                        <span key={t} className="text-[10px] font-mono border border-white/20 px-2 py-1 text-gray-400 group-hover:border-[#28a745] group-hover:text-[#28a745] transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="spec-content lg:col-span-6 lg:col-start-7">
                    <p className="text-gray-400 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="spec-content lg:col-span-1 flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#28a745]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: NEW TECH (The Circuit Flow) --- */}
        <div className="mb-40">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">New <span className="text-[#28a745]">Integrations</span></h2>
            <span className="hidden md:block font-mono text-gray-600">02 / 03</span>
          </div>

          <div className="relative">
            {/* The Vertical Circuit Line (Desktop) */}
            <div className="hidden lg:block absolute left-[30%] top-0 bottom-0 w-px bg-white/10"></div>

            {newTech.map((item, idx) => (
              <div key={idx} className="spec-row relative py-12">
                {/* Horizontal Circuit Line */}
                <div className="circuit-line absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#28a745] to-transparent opacity-30"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="spec-content lg:col-span-3 lg:text-right">
                    <h3 className="text-xl md:text-2xl font-bold uppercase text-[#28a745]">{item.title}</h3>
                  </div>
                  
                  {/* Circuit Node Dot */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                    <div className="w-3 h-3 bg-[#050505] border border-[#28a745] rounded-full z-10"></div>
                  </div>

                  <div className="spec-content lg:col-span-8">
                    <p className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: CAPACITY BUILDING (Big Typography) --- */}
        <div className="mb-40">
           <div className="flex items-end justify-between mb-20">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Capacity <span className="text-gray-600">Building</span></h2>
            <span className="hidden md:block font-mono text-gray-600">03 / 03</span>
          </div>

          <div className="space-y-20">
            {capacityBuilding.map((item, idx) => (
              <div key={idx} className="spec-row group">
                <div className="flex flex-col md:flex-row gap-6 md:items-baseline">
                  <div className="spec-content md:w-1/4">
                    <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent group-hover:from-[#28a745]/40 transition-all duration-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="spec-content md:w-3/4 border-l border-white/10 pl-6 md:pl-10 group-hover:border-[#28a745] transition-colors duration-500">
                    <h3 className="text-2xl md:text-4xl font-bold uppercase mb-4 text-white group-hover:text-[#28a745] transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl group-hover:text-gray-200">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainingCampaign;