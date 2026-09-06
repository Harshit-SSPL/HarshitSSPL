"use client";

import React, { useState, useRef, useEffect } from "react";

const heroVideos = [
  { src: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665234/ssil_hero_video_1.mp4", label: "Video 1" },
  { src: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665236/ssil_hero_video_2.mp4", label: "Video 2" },
  { src: "https://res.cloudinary.com/wlgmz8gr/video/upload/v1788665238/ssil_hero_video_3.mp4", label: "Video 3" },
];

export const HeroVideoCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    // Play active video from start and pause non-active videos
    videoRefs.current.forEach((videoEl, idx) => {
      if (videoEl) {
        if (idx === activeIdx) {
          videoEl.currentTime = 0;
          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn("Hero video autoplay exception:", err);
            });
          }
        } else {
          videoEl.pause();
        }
      }
    });
  }, [activeIdx]);

  const handleVideoEnded = (idx: number) => {
    if (idx === activeIdx) {
      setActiveIdx((prev) => (prev + 1) % heroVideos.length);
    }
  };

  const handleIndicatorClick = (idx: number) => {
    setActiveIdx(idx);
  };

  return (
    <>
      {/* Background Layered Videos with Crossfade Transition */}
      {heroVideos.map((video, idx) => (
        <video
          key={video.src}
          ref={(el) => {
            videoRefs.current[idx] = el;
          }}
          autoPlay={idx === 0}
          muted
          playsInline
          onEnded={() => handleVideoEnded(idx)}
          className={`absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-700 ease-in-out ${
            activeIdx === idx ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}

      {/* 3 Indicators at Bottom Right of Hero Section */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 z-20 flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 shadow-lg">
        {heroVideos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleIndicatorClick(idx)}
            aria-label={`Switch to Hero Video ${idx + 1}`}
            className={`cursor-pointer transition-all duration-300 ${
              activeIdx === idx
                ? "w-7 h-2 bg-ssil-red rounded-full shadow-xs"
                : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
          />
        ))}
      </div>
    </>
  );
};
