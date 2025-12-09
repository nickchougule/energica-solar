import React, { forwardRef } from 'react';
// IMPORT YOUR LOCAL IMAGES
import PowerConnection from "../assets/PowerConnection.avif";
import advise from "../assets/Advise-1.avif";

const ContentSection = forwardRef<HTMLDivElement>((props, ref) => {
  
  const data = [
    {
      title: "Renewable Distressed Assets",
      short: "Assessment & Revival Strategies",
      desc: "A feasibility study for reconstructing distressed renewable energy assets assesses market conditions, technical and financial status, reconstruction costs, and revenue projections. It reviews funding options, calculates ROI, and identifies risks.",
      img: advise
    },
    {
      title: "Infrastructure Development",
      short: "Design, Planning & Execution",
      desc: "Infrastructure development for renewable energy projects involves site selection, design, planning, and financing. It includes securing permits, constructing infrastructure, and installing technologies. Post-installation, systems are tested and commissioned.",
      img: PowerConnection
    }
  ];

  return (
    // Added z-50 to ensure it sits on top of the hero when it slides up
    <div ref={ref} className="bg-white text-black min-h-screen w-screen relative z-50 flex flex-col items-center justify-center p-6 md:p-20 border-t border-gray-200">
      
      {/* 1. HEADER */}
      <div className="text-center max-w-4xl mb-20 relative z-10">
        <span className="uppercase tracking-widest text-xs md:text-sm mb-6 text-[#28a745] font-bold block">
          We Evaluate, Consult And Advise
        </span>
        
        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-10 text-black">
          Expert <br/> <span className="text-gray-400">Advisory</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
          Providing critical insights that help lenders and clients make informed financing decisions and manage risks effectively throughout the project lifecycle.
        </p>
      </div>

      {/* 2. CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl relative z-10">
        {data.map((item, idx) => (
             <div 
                key={idx} 
                className="consult-card h-[500px] relative rounded-xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-100"
             >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy" 
                    />
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                {/* Content Wrapper */}
                <div className="absolute bottom-0 left-0 p-10 w-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    {/* Title */}
                    <h3 className="text-3xl font-bold uppercase leading-none mb-3 transition-colors duration-300">
                        {item.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-sm font-mono text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-600 pb-4 inline-block">
                        {item.short}
                    </p>

                    {/* Expandable Description */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-[300px] transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                        <p className="text-sm text-gray-200 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>

                </div>
            </div>
        ))}
      </div>

    </div>
  );
});

export default ContentSection;