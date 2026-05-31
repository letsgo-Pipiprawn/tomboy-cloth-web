import { useCallback, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import {
  EDITORIAL_CAMPAIGN_VIDEO,
  EDITORIAL_CAMPAIGN_VIDEO_POSTER,
} from '../config/editorialImages';

type EditorialCampaignVideoProps = {
  className?: string;
};

export default function EditorialCampaignVideo({ className = '' }: EditorialCampaignVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
      setShowControls(false);
    } catch {
      setIsPlaying(false);
      setShowControls(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  return (
    <div
      className={`lookbook-campaign-video relative h-full w-full bg-[#0d0d0d] ${isPlaying ? 'is-playing' : ''} ${className}`}
    >
      <video
        ref={videoRef}
        className="lookbook-campaign-video__media h-full w-full object-cover object-[center_18%]"
        src={EDITORIAL_CAMPAIGN_VIDEO}
        poster={EDITORIAL_CAMPAIGN_VIDEO_POSTER}
        preload="metadata"
        playsInline
        controls={false}
        onPause={handlePause}
        onEnded={handleEnded}
        aria-label="AW26 campaign film"
      />

      {showControls && (
        <button
          type="button"
          onClick={() => void handlePlay()}
          className="lookbook-campaign-video__play absolute inset-0 z-10 flex items-center justify-center"
          aria-label={isPlaying ? 'Pause campaign film' : 'Play campaign film'}
        >
          <span className="lookbook-campaign-video__play-btn flex items-center justify-center">
            <Play className="h-7 w-7 translate-x-0.5 text-brand-bone/95 stroke-[1.25]" aria-hidden />
          </span>
        </button>
      )}

      {!showControls && isPlaying && (
        <button
          type="button"
          onClick={() => videoRef.current?.pause()}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Pause campaign film"
        />
      )}

      <p className="pointer-events-none absolute bottom-0 inset-x-0 z-[5] px-5 py-4 md:px-6 md:py-5 type-caption text-brand-light-slate/80 tracking-[0.22em]">
        AW26 · Campaign film
      </p>
    </div>
  );
}
