'use client';

import HelpRequestForm from './components/HelpRequestForm'
import Requests from "./requests/page";
import {useAccount} from 'wagmi';
import {useEffect, useState} from "react";
import {ConnectKitButton} from 'connectkit'

export default function Home() {
  const {isConnected} = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Refugee Aid Portal</h1>
        <p className="text-xl">A platform for war refugees to seek and receive assistance</p>
      </section>

      {isConnected ? (<HelpRequestForm/>) :
        <div>
          <p className="text-xl">Please connect the wallet to submit a new listing</p>
          <ConnectKitButton/>
        </div>
      }

      <Requests/>
    </div>
  )
}
