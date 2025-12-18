import React, { useEffect, useRef } from 'react';

const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
  const match = url.match(regExp);
  return match ? match[2] : null;
};

export interface VideoPlayerProps {
  videoUrl: string;
  className?: string;

  /**
   * NOTE:
   * These callbacks ONLY fire for direct video files (mp4, webm, etc.)
   * YouTube iframe does NOT support pause/ended events without JS API.
   */
  onPause?: () => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  className,
  onPause,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoId = getYouTubeVideoId(videoUrl);

  /**
   * YOUTUBE EMBED (NO pause / ended support)
   */
  if (videoId) {
    return (
      <iframe
        className={className}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  /**
   * HTML5 VIDEO (FULL EVENT SUPPORT)
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (onPause) {
      video.addEventListener('pause', onPause);
    }
    if (onEnded) {
      video.addEventListener('ended', onEnded);
    }

    return () => {
      if (onPause) {
        video.removeEventListener('pause', onPause);
      }
      if (onEnded) {
        video.removeEventListener('ended', onEnded);
      }
    };
  }, [onPause, onEnded]);

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      autoPlay
      playsInline
      src={videoUrl}
    >
      Your browser does not support the video tag.
    </video>
  );
};
export default VideoPlayer;