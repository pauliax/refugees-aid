'use client';

import {Copyright} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-6 py-4 bg-retro-beige border-t border-retro-brown/20">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-retro-brown font-mono">
        <Copyright className="w-4 h-4 mr-2"/>
        {year} Refugee Aid
      </div>
    </footer>
  )
}
