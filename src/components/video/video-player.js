"use client";
import { getVideoType } from "@/src/helpers/video";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
const VideoPlayer = ({ item, className, layoutType }) => {
  const [thumbnailVideo, setThumbnailVideo] = useState(item.poster);

  useEffect(() => { 
    if (item.src) {
      const videoType = getVideoType(item.src);
      if (videoType === "youtube") {
        setThumbnailVideo(`https://img.youtube.com/vi/${item.src.split('v=')[1]}/0.jpg`);
      }
    }
  }, [item.src]);

  return (
    <div className={`relative w-full max-w-4xl group ${thumbnailVideo ? '' : 'bg-gray-200'} ${className}`}>
        <div data-state={layoutType} className={`relative data-[state=row]:w-[160px] data-[state=row]:h-[120px] data-[state=row]:flex-shrink-0 cursor-pointer overflow-hidden`}>
          <img
            src={thumbnailVideo || '/banner/image_default.webp'}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition hover:brightness-110">
            <div className="w-fit border border-white rounded-full p-4">
              <Play className="text-white text-6xl" />
            </div>
          </div>
        </div>
      {item.title && <div data-state={layoutType} className="px-3 py-2 data-[state=column]:mt-3 data-[state=column]:px-6 text-sm text-black font-semibold">{item.title}</div>}
    </div>
  );
};

export default VideoPlayer;