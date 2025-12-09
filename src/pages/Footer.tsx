import React from 'react';
// IMPORT LOGO
import logo from "../assets/Energica.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-6 md:px-10 border-t border-gray-900 relative z-20">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        
        {/* LEFT SIDE: BIG LOGO & SHORT DESC */}
        <div>
          <div className="mb-6">
              {/* Logo Only - Made Bigger */}
              <img 
                src={logo} 
                alt="Energica Logo" 
                className="h-24 w-auto object-contain"
              />
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            [cite_start]Bridging the gap between technical feasibility and financial viability. [cite: 35]
            [cite_start]We assess renewable projects to ensure investments are sound, compliant, and optimized for success. [cite: 32-33]
          </p>
        </div>

        {/* RIGHT SIDE: SOCIALS & LEGAL */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 w-full md:w-auto">
          
          {/* Socials Column */}
          <div className="flex flex-col gap-4">
            <h4 className="uppercase tracking-widest text-xs font-bold text-[#28a745]">Socials</h4>
            <a href="#" className="hover:text-[#28a745] text-gray-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#28a745] text-gray-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#28a745] text-gray-400 transition-colors">Twitter</a>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
             <h4 className="uppercase tracking-widest text-xs font-bold text-[#28a745]">Legal</h4>
            <a href="#" className="hover:text-[#28a745] text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#28a745] text-gray-400 transition-colors">Terms of Service</a>
          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-20 pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between text-xs text-gray-600 uppercase tracking-wider gap-4">
        <span>© 2025 Energica Sustain Foundation.</span>
        <span>Pune, Maharashtra</span>
      </div>

    </footer>
  );
};

export default Footer;