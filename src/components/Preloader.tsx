import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import win50fps from "../assets/win50fps.mp4"; 
import logo from "../assets/Energica.png";

// 1. Accept the onComplete prop
const Preloader = ({ onComplete }) => {
  const container = useRef(null);

  useLayoutEffect(() => {
    // Remove the static HTML preloader if it exists
    const htmlLoader = document.getElementById("preloader-init");
    if (htmlLoader) htmlLoader.remove();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(container.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
        delay: 3.5,
        // 2. Call the parent function when animation is completely done
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      gsap.from(".logo-reveal", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      });

      gsap.from(".loader-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        stagger: 0.1
      });
    }, container);

    return () => ctx.revert();
  }, [onComplete]); // Add onComplete to dependency array

  return (
    <div
      ref={container}
      className="fixed inset-0 bg-white z-[9999] flex flex-col justify-between overflow-hidden text-black"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src={win50fps}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* REDUCED BLUR & OPACITY */}
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      {/* Top Text */}
      <div className="relative z-10 flex justify-between p-10 uppercase text-xs tracking-widest font-bold loader-text text-[#0056b3]">
        <span>Energica Sustain Foundation</span>
        <span>Maharashtra, IND</span>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        <img
          src={logo}
          alt="Energica Logo"
          className="w-40 md:w-60 h-auto mb-8 logo-reveal drop-shadow-2xl"
        />
      </div>

      {/* Bottom Text */}
      <div className="relative z-10 flex justify-between p-10 uppercase text-xs tracking-widest font-bold loader-text text-[#0056b3]">
        <span>Initializing Assets</span>
        <span>ESF v2.0</span>
      </div>
    </div>
  );
};

export default Preloader;