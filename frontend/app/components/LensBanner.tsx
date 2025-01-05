'use client';

import { Heart } from "lucide-react";
import Image from "next/image";

export const LensBanner = () => {
  return (
    <div className="w-full py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-retro-brown font-mono">
        <Image
          src="/lens_400x400.png"
          alt="Lens Protocol"
          width={100}
          height={100}
        />
        Built on Lens
        <Heart className="w-4 h-4 text-red-500 fill-current" />
      </div>
    </div>
  );
};
