import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "How can your consultancy help us understand the renewable energy market better?",
    answer: "We provide deep market intelligence and real-time renewable energy trends to help you stay ahead."
  },
  {
    question: "Do you offer leadership or team development support?",
    answer: "Yes—our programs strengthen leadership and help build cohesive teams across organizations."
  },
  {
    question: "How do you perform renewable asset due diligence?",
    answer: "Through technical, legal, and operational audits to evaluate investment risk and project viability."
  },
  {
    question: "Can you assist with contract negotiation and advisory?",
    answer: "We optimize terms and support negotiation strategy for clean energy procurement."
  },
  {
    question: "How do you improve operational efficiency in renewable projects?",
    answer: "We streamline operations using performance analysis, cost reduction, and optimization insights."
  }
];

const FAQSection = () => {
  const container = useRef<HTMLDivElement>(null);
  // Track which accordion item is open (null = all closed)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple reveal animation for the whole section
      gsap.from(".faq-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-[#0b0b0b] text-white min-h-screen w-screen relative z-10 flex flex-col items-center justify-center p-6 md:p-20 border-t border-gray-900">
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT SIDE: Title & Desc */}
        <div className="lg:w-1/3 faq-content">
            <div className="sticky top-32">
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight mb-8">
                    Questions You Haven’t Asked <br/> <span className="text-[#28a745]">Yet</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Before you even ask, we anticipate what’s on your mind. Here are answers to the thoughts most visitors have before stepping deeper into the experience.
                </p>
            </div>
        </div>

        {/* RIGHT SIDE: Accordion List */}
        <div className="lg:w-2/3 faq-content w-full">
            <div className="flex flex-col border-t border-gray-800">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-gray-800">
                        {/* Question Header */}
                        <button 
                            onClick={() => toggleAccordion(index)}
                            className={`w-full py-8 px-6 text-left flex justify-between items-center transition-colors duration-300 ${activeIndex === index ? 'bg-[#1a1a1a]' : 'hover:bg-white/5'}`}
                        >
                            <h3 className={`text-xl md:text-2xl font-medium pr-8 transition-colors ${activeIndex === index ? 'text-[#28a745]' : 'text-white'}`}>
                                {item.question}
                            </h3>
                            
                            {/* The + / x Icon */}
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-white transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}></span>
                                <span className={`absolute top-1/2 left-0 w-6 h-[2px] bg-white transition-transform duration-300 ${activeIndex === index ? '-rotate-45' : 'rotate-90'}`}></span>
                            </div>
                        </button>

                        {/* Answer Body (Animated Height) */}
                        <div 
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 pt-0 bg-[#1a1a1a]">
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {item.answer}
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

export default FAQSection;