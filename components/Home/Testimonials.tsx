import React, { useState } from 'react';
import { Play, Star, X } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';

export const Testimonials: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const closePopup = () => {
    setActiveVideo(null);
  };

  const isYouTube = (url: string) =>
    url.includes("youtube.com") || url.includes("youtu.be");

  const isInstagram = (url: string) =>
    url.includes("instagram.com") || url.includes("instagr.am");

  const getEmbedUrl = (url: string) => {
    // YOUTUBE
    if (isYouTube(url)) {
      if (url.includes("watch?v=")) {
        return url.replace("watch?v=", "embed/") + "?autoplay=1";
      }
      return url + "?autoplay=1";
    }

    // INSTAGRAM
    if (isInstagram(url)) {
      return url.replace("?utm_source=ig_web_copy_link", "") + "embed/";
    }

    // DEFAULT (just return URL)
    return url;
  };

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Student Success Stories
          </h2>
          <p className="text-slate-400">
            Hear from our alumni working at top tech companies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden 
              hover:shadow-[0_0_30px_rgba(8,145,178,0.15)] 
              hover:border-primary-500/30 transition-all duration-300"
            >
              <div
                className="relative h-56 group cursor-pointer overflow-hidden"
                onClick={() => setActiveVideo(testimonial.videolink)}
              >
                <img
                  src={testimonial.videoThumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover opacity-90 
                  group-hover:opacity-100 group-hover:scale-105 
                  transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full 
                  flex items-center justify-center group-hover:scale-110 
                  transition-transform border border-white/30">
                    <Play fill="white" className="text-white ml-1" size={24} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-primary-400 text-xs font-medium">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-slate-800 fill-slate-800'
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-sm italic leading-relaxed">
                  “{testimonial.text}”
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-6">
          <div className="relative bg-slate-900 p-4 rounded-2xl w-full max-w-4xl shadow-xl">

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 
              text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden">
              {isYouTube(activeVideo) || isInstagram(activeVideo) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(activeVideo)}
                  title="Embedded Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video width="100%" height="100%" controls autoPlay>
                  <source src={activeVideo} type="video/mp4" />
                </video>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
