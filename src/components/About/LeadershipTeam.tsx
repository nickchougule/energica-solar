// src/components/about/LeadershipTeam.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const teamData = [
    { name: "Dr. K. Sharma", role: "Chief Executive Officer (CEO)", desc: "15+ years experience in project finance and distressed asset reconstruction." },
    { name: "S. Rao", role: "Chief Technology Officer (CTO)", desc: "Expert in hybrid inverter systems and grid compliance standards (CEA, CERC)." },
    { name: "A. Verma", role: "Head of Infrastructure & Land Acquisition", desc: "Specializes in large-scale solar land procurement near high-capacity substations." },
    { name: "P. Singh", role: "Director of Training & Capacity Building", desc: "Leads national training programs for installers under government solar schemes." },
];

const LeadershipTeam = () => {
    const [activeRole, setActiveRole] = useState(teamData[0].role);
    const [activeDesc, setActiveDesc] = useState(teamData[0].desc);

    return (
        <div className="bg-[#171717] text-white py-32 px-6 md:px-20 relative">
            <div className="max-w-7xl mx-auto">
                <span className="text-[#28a745] font-mono tracking-widest text-sm uppercase font-bold block mb-4">
                    The People Behind The Power
                </span>
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-none mb-16">
                    Leadership <br/> <span className="text-gray-600">Team</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    
                    {/* LEFT COLUMN: Hover List */}
                    <div className="md:col-span-2 border-r border-gray-700 pr-10">
                        {teamData.map((member, idx) => (
                            <motion.div 
                                key={idx}
                                className="group border-t border-gray-700 py-6 md:py-8 cursor-pointer transition-colors duration-300"
                                onMouseEnter={() => { setActiveRole(member.role); setActiveDesc(member.desc); }}
                                onMouseLeave={() => { setActiveRole(teamData[0].role); setActiveDesc(teamData[0].desc); }}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-4xl md:text-5xl font-black uppercase group-hover:text-[#28a745] transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <span className="text-sm font-mono tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                        /0{idx + 1}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Active Details (Sticky or Fixed Positioning) */}
                    <motion.div className="md:col-span-1 md:sticky md:top-20 h-fit pt-6 md:pt-10">
                        <span className="text-gray-400 font-mono tracking-widest text-sm block mb-2">
                            Active Profile
                        </span>
                        <motion.h4 
                            key={activeRole} // Key change ensures Framer Motion animates the change
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-xl font-bold uppercase mb-4 text-[#28a745]"
                        >
                            {activeRole}
                        </motion.h4>
                        <motion.p 
                            key={activeDesc}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            className="text-gray-400 text-lg leading-relaxed"
                        >
                            {activeDesc}
                        </motion.p>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default LeadershipTeam;