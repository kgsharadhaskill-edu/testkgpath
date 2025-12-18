// src/components/common/VideoModal.tsx

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title = "Intro Video" }) => {
  // Effect to handle 'Escape' key press and body scroll
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-slate-950 rounded-lg shadow-2xl overflow-hidden border border-slate-800"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-800">
           <h2 id="video-modal-title" className="text-lg font-semibold text-white">{title}</h2>
           <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors rounded-full p-1"
              aria-label="Close video player"
           >
              <X size={24} />
           </button>
        </div>
        {/* Responsive video container */}
        <div className="aspect-video bg-black">
          {videoUrl && <VideoPlayer videoUrl={videoUrl} className="w-full h-full" />}
        </div>
      </div>
    </div>
  );
};