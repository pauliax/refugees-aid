'use client';

import React, {FormEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {useToast} from "@/components/hooks/use-toast";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useContract} from "@/hooks/useContract";
import {secondsToDays, secondsToHours} from "@/utils/utility-functions";
import {parseEther} from 'viem';

export const NewListing = () => {
  const {toast} = useToast();
  const [formData, setFormData] = useState({
    type: "ask",
    description: "",
    amount: "",
    duration: "",
  });

  const {
    readData: MAX_DURATION
  } = useContract({
    functionName: 'MAX_DURATION'
  });

  const {
    readData: ACCEPTANCE_WINDOW
  } = useContract({
    functionName: 'ACCEPTANCE_WINDOW'
  });

  const {handleWrite, isWritePending} = useContract({
    functionName: 'createListing',
    args: [
      formData.type == 'ask' ? 0 : 1,
      formData.description,
      parseEther(formData.amount), // in wei
      Number(formData.duration) * 3600, // in seconds
    ]
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Submitting:", {...formData});

    try {
      const {error} = await handleWrite?.() || {};
      if (error) {
        console.error('Contract write error:', error);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Transaction failed",
          duration: 4000,
        });
      } else {
        toast({
          title: "Listing Created",
          description: "Your listing has been published.",
          duration: 4000,
        });
        setFormData({type: "ask", description: "", amount: "", duration: ""});
      }
    } catch (e) {
      console.error('Transaction failed:', e);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({...prev, type: value}));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-retro-cream border-retro-brown/20">
      <CardHeader>
        <CardTitle className="font-heading text-xl text-retro-brown">
          Create New Assistance Listing
        </CardTitle>
        <CardDescription className="font-mono text-sm text-retro-brown/70">
          Please provide details about the assistance you need
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="font-mono text-retro-brown">Type of Assistance</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={handleTypeChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ask" id="ask"/>
                <Label htmlFor="ask" className="font-mono text-retro-brown">Ask for Help</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="offer" id="offer"/>
                <Label htmlFor="offer" className="font-mono text-retro-brown">Offer Help</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="font-mono text-retro-brown">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="font-mono text-retro-brown border-retro-brown/20 focus:border-retro-sage min-h-[100px]"
              placeholder="Please describe your assistance in detail"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-mono text-retro-brown">
                Amount Needed
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                min={0}
                className="font-mono text-retro-brown border-retro-brown/20 focus:border-retro-sage"
                placeholder="in GRASS, leave 0 if not needed"
                title="in GRASS, leave 0 if not needed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="font-mono text-retro-brown">
                Duration (hours)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                min={0}
                max={secondsToHours(MAX_DURATION).toString()}
                className="font-mono text-retro-brown border-retro-brown/20 focus:border-retro-sage"
                placeholder="in hours, leave 0 for instant"
                title="in hours, leave 0 for instant"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-retro-brown">
              Maximum duration: {secondsToDays(MAX_DURATION)} days.
            </h2>
            <h2 className="font-heading text-retro-brown">
              Requests expire after: {secondsToDays(ACCEPTANCE_WINDOW)} days.
            </h2>
          </div>
          <Button
            type="submit"
            className="w-full bg-retro-sage hover:bg-retro-olive text-white font-mono transition-colors duration-300"
            disabled={isWritePending}
          >
            Submit Listing
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
