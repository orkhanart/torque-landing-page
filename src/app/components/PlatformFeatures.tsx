"use client";

import { SectionTitle } from "./SectionTitle";
import { GeometricCard } from "./GeometricCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const features = [
  {
    title: "Leaderboards",
    description:
      "Ignite engagement with real-time, competitive leaderboards.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/leaderboards.mp4",
  },
  {
    title: "Raffles",
    description:
      "Run automated giveaways to attract and reward users.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/raffles.mp4",
  },
  {
    title: "Airdrops / Claims",
    description:
      "Deliver tokens and points to top users—automatically.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/airdrops.mp4",
  },
  {
    title: "Rebates",
    description:
      "Launch loyalty programs that reward activity and drive retention.",
    video: "https://onnyx-poc-audience-images.s3.us-east-1.amazonaws.com/rebates.mp4",
  },
];

const videoTitle = "Flexible rewards system using a no-code interface";

const titleParts = [
  {
    text: "Enabling top Solana protocols to use their tokens and points as",
  },
  {
    text: "fuel for growth,",
    gradient: true,
  },
  {
    text: "by launching",
  },
  {
    text: "smart incentive campaigns in seconds.",
    gradient: true,
  },
];

// Video cache to prevent reloading
const videoCache = new Map<string, HTMLVideoElement>();

// Preload videos to cache them
const preloadVideo = (src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    if (videoCache.has(src)) {
      resolve(videoCache.get(src)!);
      return;
    }
    
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    
    const handleLoad = () => {
      videoCache.set(src, video);
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
      resolve(video);
    };
    
    const handleError = () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
      reject(new Error(`Failed to load video: ${src}`));
    };
    
    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);
    video.src = src;
  });
};

export function PlatformFeatures({ className }: { className?: string }) {
  const videoRef = useRef(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(features[0].video);
  const [activeFeature, setActiveFeature] = useState<string>("Leaderboards");
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [loadingFeature, setLoadingFeature] = useState<string>("");
  const [shouldAutoplay, setShouldAutoplay] = useState(true);
  const [videosPreloaded, setVideosPreloaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.7, 1, 0.9]);

  // Preload all videos on component mount
  useEffect(() => {
    const preloadAllVideos = async () => {
      try {
        await Promise.all(features.map(feature => preloadVideo(feature.video)));
        setVideosPreloaded(true);
      } catch (error) {
        console.warn('Some videos failed to preload:', error);
        setVideosPreloaded(true); // Continue anyway
      }
    };
    
    preloadAllVideos();
  }, []);

  // Optimized video switching using cached videos
  const handleFeatureClick = useCallback((feature: (typeof features)[0]) => {
    if (feature.video !== currentVideo) {
      setVideoLoading(true);
      setLoadingFeature(feature.title);
      
      // Use requestAnimationFrame to defer work and prevent blocking
      requestAnimationFrame(() => {
        const cachedVideo = videoCache.get(feature.video);
        
        if (cachedVideo && videoElementRef.current) {
          // Clone the cached video's attributes to current video element
          videoElementRef.current.src = feature.video;
          videoElementRef.current.currentTime = 0;
          
          // Minimal delay for smooth transition
          setTimeout(() => {
            setActiveFeature(feature.title);
            setCurrentVideo(feature.video);
            setVideoLoading(false);
            setLoadingFeature("");
            
            if (shouldAutoplay && videoElementRef.current) {
              videoElementRef.current.play().catch(() => {});
            }
          }, 300); // Reduced from 1000ms to 300ms
        } else {
          // Fallback for non-cached videos
          if (videoElementRef.current) {
            videoElementRef.current.src = feature.video;
            videoElementRef.current.load();
            
            const handleCanPlay = () => {
              setTimeout(() => {
                setActiveFeature(feature.title);
                setCurrentVideo(feature.video);
                setVideoLoading(false);
                setLoadingFeature("");
                if (shouldAutoplay && videoElementRef.current) {
                  videoElementRef.current.play().catch(() => {});
                }
              }, 300);
              
              if (videoElementRef.current) {
                videoElementRef.current.removeEventListener('canplay', handleCanPlay);
              }
            };
            
            videoElementRef.current.addEventListener('canplay', handleCanPlay);
          }
        }
      });
      
      setShouldAutoplay(true);
    } else {
      setActiveFeature(feature.title);
    }
  }, [currentVideo, shouldAutoplay]);

  const handleFeatureHover = (feature: (typeof features)[0]) => {
    setHoveredFeature(feature.title);
    // Don't change video on hover - only visual hover effects
  };

  const handleFeatureLeave = () => {
    setHoveredFeature(null);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <SectionTitle title={titleParts} className="mb-8" />
      
      {/* Flexible rewards system text */}
      <div className="text-center mb-12">
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Flexible rewards system with SDK-first architecture and no-code
          interface. No data indexing required.
        </p>
      </div>
      
      {/* Desktop: Horizontal layout with vertical cards and video */}
      <div className="hidden md:flex gap-8 w-full max-w-7xl mx-auto mb-20">
        {/* Right: Video */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-8">
            {/* Left: Vertical feature cards - vertically centered with video */}
            <div className="flex flex-col gap-3 w-64 flex-shrink-0">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  onClick={() => handleFeatureClick(feature)}
                  onMouseEnter={() => handleFeatureHover(feature)}
                  onMouseLeave={handleFeatureLeave}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeFeature === feature.title || loadingFeature === feature.title
                      ? "ring-2 ring-primary shadow-lg shadow-primary/40 scale-105 bg-primary/10"
                      : hoveredFeature === feature.title
                      ? "ring-2 ring-primary/50 shadow-md shadow-primary/20 scale-105 bg-primary/5"
                      : "hover:scale-102 hover:shadow-md"
                  }`}
                >
                  <GeometricCard
                    title={feature.title}
                    description={feature.description}
                    isActive={activeFeature === feature.title}
                  />
                </div>
              ))}
            </div>
            
            {/* Video player */}
            <div className="flex justify-center flex-1 relative" ref={videoRef}>
              <div className="relative w-full aspect-video">
                <motion.video
                  ref={videoElementRef}
                  loop
                  muted
                  playsInline
                  controls
                  autoPlay={shouldAutoplay}
                  className={`absolute inset-0 w-full h-full rounded-xl shadow-lg border border-primary/20 transition-opacity duration-300 object-cover ${
                    videoLoading ? "opacity-20" : "opacity-100"
                  }`}
                  preload="metadata"
                  style={{ scale }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  src={currentVideo}
                  onError={() => setVideoLoading(false)}
                >
                  Your browser does not support the video tag.
                </motion.video>
              </div>

              {/* Enhanced Loading skeleton overlay */}
              {videoLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent"></div>
                      <div className="absolute inset-0 rounded-full h-12 w-12 border-3 border-primary/20"></div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-medium text-white">Loading {loadingFeature} Demo</p>
                    </div>
                    {/* Animated progress dots */}
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Video title badge */}
              {!videoLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
                >
                  <span className="text-sm font-medium text-white">
                    {activeFeature} Demo
                  </span>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal cards above video */}
      <div className="md:hidden mb-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => handleFeatureClick(feature)}
              className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                activeFeature === feature.title
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/40 ring-1 ring-primary/50 scale-102"
                  : "border-gray-700 bg-black/20 hover:border-gray-600"
              }`}
            >
              <h3 className={`font-semibold text-sm mb-2 ${
                activeFeature === feature.title ? "text-primary" : "text-white"
              }`}>
                {feature.title}
              </h3>
              <p className="text-gray-400 text-xs leading-tight">
                {feature.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile: Keep original layout */}
      <div className="md:hidden w-full flex justify-center mb-20 relative">
        <div className="relative w-full aspect-video">
          <motion.video
            ref={videoElementRef}
            loop
            muted
            playsInline
            controls
            autoPlay={shouldAutoplay}
            className={`absolute inset-0 w-full h-full rounded-xl shadow-lg border border-primary/20 transition-opacity duration-300 object-cover ${
              videoLoading ? "opacity-20" : "opacity-100"
            }`}
            preload="metadata"
            style={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            src={currentVideo}
            onError={() => setVideoLoading(false)}
          >
            Your browser does not support the video tag.
          </motion.video>
        </div>

        {/* Mobile: Enhanced Loading skeleton overlay */}
        {videoLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-xl backdrop-blur-sm"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                <div className="absolute inset-0 rounded-full h-10 w-10 border-2 border-primary/20"></div>
              </div>
              <div className="text-center space-y-1">
                <p className="text-base font-medium text-white">Loading {loadingFeature} Demo</p>
              </div>
              {/* Animated progress dots */}
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Mobile: Video title badge */}
        {!videoLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
          >
            <span className="text-sm font-medium text-white">
              {activeFeature} Demo
            </span>
          </motion.div>
        )}

      </div>
    </div>
  );
}
