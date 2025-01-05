'use client';

import {ConnectKitButton} from 'connectkit'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-retro-beige border-b border-retro-brown/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-retro-brown">
          Refugee Aid Platform
        </h1>
        <ConnectKitButton/>
      </div>
    </header>
  );
}
