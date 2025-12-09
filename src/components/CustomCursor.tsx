import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursor = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = cursor.current;
    const f = follower.current;

    if (!c || !f) return;

    gsap.set(c, { xPercent: -50, yPercent: -50 });
    gsap.set(f, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(c, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(f, { x: e.clientX, y: e.clientY, duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Small Dot - Green */}
      <div 
        ref={cursor} 
        className="fixed top-0 left-0 w-3 h-3 bg-[#28a745] rounded-full pointer-events-none z-[9999]"
      />
      {/* Larger Ring - Dark Gray */}
      <div 
        ref={follower} 
        className="fixed top-0 left-0 w-10 h-10 border border-gray-800 rounded-full pointer-events-none z-[9998] opacity-30"
      />
    </>
  );
};

export default CustomCursor;