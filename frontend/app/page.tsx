'use client';

import {useAccount} from 'wagmi';
import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import {NewListing} from "./components/NewListing";
import HelpRequestList from "./components/HelpRequestList";
import Footer from "@/components/Footer";
import {LensBanner} from "@/components/LensBanner";
import {Toaster} from "@/components/ui/toaster";
import {useContract} from "@/hooks/useContract";

export default function Home() {
  const {isConnected} = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    readData: listingCounter
  } = useContract({
    functionName: 'listingCounter'
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-retro-beige flex flex-col">
      <Header/>
      <LensBanner/>
      <Toaster/>
      <main className="container mx-auto py-4 space-y-8">
        <div className="container mx-auto px-4 pb-2">
          <section className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-retro-brown">Welcome to the Refugee Aid Portal</h1>
            <p className="text-xl text-retro-brown">A portal for refugees to seek and receive assistance</p>
          </section>
        </div>

        {isConnected ? (<NewListing/>) :
          <div>
            <h4 className="font-heading text-xl text-retro-brown mb-6 px-6">
              Please connect the wallet to submit a new listing
            </h4>
          </div>
        }

        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl text-retro-brown mb-6 px-6">
            Aid Listings ({listingCounter})
          </h2>
          <HelpRequestList/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
