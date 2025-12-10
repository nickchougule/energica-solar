// src/components/about/MissionVision.tsx
import React from "react";

const MissionVision: React.FC = () => {
    return (
        <section className="w-full min-h-screen bg-[#0a0a0a] py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-[#28a745]/10 border border-[#28a745]/30 rounded-full text-[#28a745] text-sm font-mono uppercase tracking-wider mb-4">
                        Our Foundation
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white">
                        Mission & Vision
                    </h2>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* MISSION */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#28a745]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111] border-2 border-[#28a745]/30 rounded-3xl p-8 md:p-10 h-full transform group-hover:scale-[1.02] transition-all duration-300">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#28a745]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#28a745]/20 transition-colors">
                                <svg className="w-8 h-8 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>

                            {/* Title */}
                            <div className="mb-6">
                                <span className="text-[#28a745] font-mono text-xs uppercase tracking-widest">Our Purpose</span>
                                <h3 className="text-4xl md:text-5xl font-black text-white mt-2">Mission</h3>
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                To bridge the critical gap between technical feasibility and financial
                                viability in renewable energy projects, driving sustainable infrastructure
                                development across India, aligning with government schemes like PM Surya Ghar
                                and KUSUM Yojana to ensure energy security for all.
                            </p>

                            {/* Features */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#28a745] rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Technical Feasibility</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#28a745] rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Financial Viability</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#28a745] rounded-full"></div>
                                    <span className="text-gray-400 text-sm">Government Alignment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VISION */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#28a745]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111] border-2 border-[#28a745]/30 rounded-3xl p-8 md:p-10 h-full transform group-hover:scale-[1.02] transition-all duration-300">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-[#28a745]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#28a745]/20 transition-colors">
                                <svg className="w-8 h-8 text-[#28a745]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>

                            {/* Title */}
                            <div className="mb-6">
                                <span className="text-[#28a745] font-mono text-xs uppercase tracking-widest">Our Future</span>
                                <h3 className="text-4xl md:text-5xl font-black text-white mt-2">Vision</h3>
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                To be the most trusted technical and financial advisory in the renewable
                                sector, recognized for our commitment to integrity and innovation,
                                accelerating India's transition to 100% sustainable energy independence.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-[#28a745]/5 rounded-xl border border-[#28a745]/20">
                                    <div className="text-3xl font-black text-[#28a745] mb-1">100%</div>
                                    <div className="text-xs text-gray-400 uppercase">Sustainable</div>
                                </div>
                                <div className="text-center p-4 bg-[#28a745]/5 rounded-xl border border-[#28a745]/20">
                                    <div className="text-3xl font-black text-[#28a745] mb-1">#1</div>
                                    <div className="text-xs text-gray-400 uppercase">Trusted</div>
                                </div>
                                <div className="text-center p-4 bg-[#28a745]/5 rounded-xl border border-[#28a745]/20">
                                    <div className="text-3xl font-black text-[#28a745] mb-1">∞</div>
                                    <div className="text-xs text-gray-400 uppercase">Innovation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#28a745]/50"></div>
                        <span className="font-mono">Building India's Green Future</span>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#28a745]/50"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;