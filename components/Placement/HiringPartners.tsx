
import React from 'react';
import { PARTNER_LOGOS } from '../../constants';

export const HiringPartners: React.FC = () => {
    return (
        <section className="py-20 bg-slate-950">
            <div className="w-full pt-16 pb-8">
                <p className="text-center text-slate-500 text-xs font-semibold mb-6 uppercase tracking-widest">
                    Trusted Hiring Partners
                </p>

                <div className="relative overflow-hidden w-full py-4 border-y border-slate-900/50 bg-black/30 backdrop-blur-sm">
                    <div className="flex items-center gap-20 whitespace-nowrap animate-marquee">
                        {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, i) => (
                            <img
                                key={i}
                                src={partner.src}
                                alt={`${partner.name} logo`}
                                className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                                loading="lazy"
                            />
                        ))}
                    </div>

                    {/* Edge fade */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent" />
                </div>
            </div>
        </section>
    );
};
