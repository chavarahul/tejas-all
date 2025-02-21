"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowLoader(false), 500);
          return 100;
        }
        return prev + (1 + Math.floor(prev / 20));
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <Star className="h-16 w-16 text-purple-500 mx-auto animate-spin mb-8" />
        <div className="text-4xl font-bold text-white mb-4">{progress}%</div>
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}