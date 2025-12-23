import React from 'react';

interface HiringPartnersProps {
  partners: string[];
  category: string;
}

export const HiringPartners: React.FC<HiringPartnersProps> = ({ partners, category }) => {
  if (!partners || partners.length === 0) return null;

  return (
    // Reduced vertical padding from py-6 to py-4
    <section className="py-4 bg-slate-900/50 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Heading */}
        {/* Reduced bottom margin from mb-10 to mb-6 */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white"> {/* Optional: Reduced font size */}
            Top Companies Hiring <span className="text-primary-400">{category}</span> Grads
          </h3>
          <p className="text-slate-400 text-sm mt-2">Our alumni work here</p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
            {[...partners, ...partners, ...partners].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Partner Logo"
                // Reduced the height of the logos
                className="h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>

          {/* Gradient fade overlays */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};