import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE ---
const policies = [
  {
    id: "01",
    title: "PM Surya Ghar",
    subtitle: "Muft Bijli Yojana",
    intro: "A flagship scheme targeting 1 crore households to provide free electricity. It reduces DISCOM load, boosts renewable capacity, and significantly cuts carbon emissions.",
    benefits: [
      "Subsidy of ₹78,000 to ₹1,18,000",
      "Free electricity up to 300 units/month",
      "Reduced carbon footprint"
    ],
    eligibility: "Residential consumers only. Must own the roof rights.",
    link: "https://pmsuryaghar.gov.in",
    accent: "#28a745" // Green
  },
  {
    id: "02",
    title: "PM KUSUM",
    subtitle: "Solar for Farmers",
    intro: "Promotes solar-powered agriculture by supporting farmers with solar pumps and grid-connected plants, replacing diesel pumps to reduce costs and pollution.",
    benefits: [
      "90% subsidy on solar pumps",
      "Diesel-free reliable irrigation",
      "Income from selling surplus power"
    ],
    eligibility: "Farmers, cooperatives, and panchayats with agricultural land.",
    link: "https://pmkusum.mnre.gov.in",
    accent: "#eab308" // Yellow/Gold
  },
  {
    id: "03",
    title: "SMART Program",
    subtitle: "Community Empowerment",
    intro: "Focused on making economically weaker and BPL households self-reliant through solar electricity, increasing usage while reducing carbon emissions.",
    benefits: [
      "Up to 95% Subsidy for BPL households",
      "Up to 80% Subsidy for General Category (EWS)",
      "Promotes local solar manufacturing"
    ],
    eligibility: "Monthly consumption ≤ 100 units (Oct '24 - Sep '25).",
    link: "#",
    accent: "#3b82f6" // Blue
  },
  {
    id: "04",
    title: "Green Open Access",
    subtitle: "Industrial Power",
    intro: "Enables industries and commercial users to procure renewable power directly from generators via open access, bypassing traditional fossil-fuel limits.",
    benefits: [
      "Lower electricity bills",
      "100% Renewable Sourcing",
      "No capacity limit sanctions"
    ],
    eligibility: "Consumers with contracted demand > 100 kW.",
    link: "https://greenopenaccess.in",
    accent: "#10b981" // Emerald
  },
  {
    id: "05",
    title: "Virtual Net Metering",
    subtitle: "Shared Generation",
    intro: "Allows multiple consumers (like apartment owners) to share generation from a single common solar plant, receiving individual bill credits.",
    benefits: [
      "Maximizes limited roof space",
      "Shared savings for multi-storey buildings",
      "Supports larger central solar systems"
    ],
    eligibility: "Residential/Commercial units within same DISCOM area.",
    link: "#",
    accent: "#8b5cf6" // Violet
  },
  {
    id: "06",
    title: "Group Net Metering",
    subtitle: "Enterprise Efficiency",
    intro: "Allows organizations with multiple connections (e.g., factories in different locations) to offset total consumption using a single solar plant.",
    benefits: [
      "Centralized solar generation",
      "Offsets power across multiple locations",
      "Simplifies billing and management"
    ],
    eligibility: "Consumers with multiple connections in the same distribution zone.",
    link: "#",
    accent: "#f43f5e" // Rose
  }
];

const AwarenessCampaign = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. ANIMATE CARDS STACKING
      const cards = gsap.utils.toArray(".policy-card");
      
      cards.forEach((card: any, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top", 
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(card, {
              scale: 1 - (self.progress * 0.05), // Subtle scale down
              filter: `brightness(${1 - (self.progress * 0.3)})`, // Darken slightly
              overwrite: 'auto'
            });
          }
        });
      });

      // 2. TITLE FADE ON SCROLL
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500",
          scrub: true
        }
      });

    }, containerRef);

    // --- CRITICAL FIX FOR FOOTER/ROUTING ISSUES ---
    // React Router sometimes keeps old scroll positions or renders before layout is ready.
    // This forces GSAP to re-calculate start/end positions after a short delay.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    // Added 'relative z-10' to ensure this page stays above the footer until scrolled
    <div ref={containerRef} className="bg-[#0b0b0b] text-white relative min-h-screen z-10">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")' }}>
      </div>

      {/* --- CENTERED HERO TITLE --- */}
      <div className="relative z-10 w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div ref={titleRef}>
          <span className="text-[#28a745] font-mono tracking-[0.3em] text-xs md:text-sm uppercase font-bold block mb-4">
            Policy & Awareness
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Government <br/> <span className="text-gray-600">Initiatives</span>
          </h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 animate-bounce text-gray-500 text-2xl"
          >
            ↓
          </motion.div>
        </div>
      </div>

      {/* --- STACKING CARDS CONTAINER --- */}
      {/* 'relative z-20' ensures cards sit above background elements but interact correctly with flow */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pb-20">
        {policies.map((policy, index) => (
          <div 
            key={index}
            className="policy-card sticky top-20 md:top-28 mb-6 md:mb-10 w-full"
            style={{ 
                zIndex: index + 1 
            }}
          >
            {/* Standard div to avoid Framer/GSAP conflict */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 shadow-2xl backdrop-blur-xl will-change-transform"
            >
              {/* Card Header Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Ambient Glow */}
              <div 
                className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full blur-[100px] md:blur-[120px] opacity-10 pointer-events-none"
                style={{ backgroundColor: policy.accent }}
              ></div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-10 items-start">
                
                {/* LEFT: ID & INTRO */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <span className="text-lg md:text-xl font-mono text-gray-500">/{policy.id}</span>
                      <span 
                        className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10"
                        style={{ color: policy.accent, borderColor: `${policy.accent}33` }}
                      >
                        {policy.subtitle}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4 md:mb-6">
                      {policy.title}
                    </h2>

                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                      {policy.intro}
                    </p>
                  </div>

                  {/* ELIGIBILITY (Boxed) */}
                  <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5">
                    <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Eligibility</h4>
                    <p className="text-sm md:text-base text-gray-200">
                      {policy.eligibility}
                    </p>
                  </div>
                </div>

                {/* RIGHT: BENEFITS & CTA */}
                <div className="md:col-span-5 flex flex-col justify-between h-full border-t md:border-t-0 md:border-l border-white/10 md:pl-8 pt-6 md:pt-0">
                  <div>
                    <h3 className="flex items-center gap-2 text-base md:text-lg font-bold uppercase mb-4 md:mb-6 text-white">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: policy.accent }}></span>
                      Key Benefits
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {policy.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-gray-400 text-xs md:text-sm">
                          <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: policy.accent }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 md:mt-10">
                    <a 
                      href={policy.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group flex items-center justify-between w-full p-3 md:p-4 bg-white text-black font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-[#28a745] hover:text-white transition-all duration-300"
                    >
                      Check Eligibility
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AwarenessCampaign;
