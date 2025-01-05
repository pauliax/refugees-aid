'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/hooks/use-toast";

export const NewListing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    amount: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    toast({
      title: "Listing Created",
      description: "Your assistance request has been published.",
    });
    setFormData({ type: "", description: "", amount: "", duration: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            <Label htmlFor="type" className="font-mono text-retro-brown">
              Type of Assistance
            </Label>
            <Input
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="font-mono border-retro-brown/20 focus:border-retro-sage"
              placeholder="e.g., Housing, Medical, Food"
              required
            />
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
              className="font-mono border-retro-brown/20 focus:border-retro-sage min-h-[100px]"
              placeholder="Please describe your needs in detail"
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
                className="font-mono border-retro-brown/20 focus:border-retro-sage"
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="font-mono text-retro-brown">
                Duration (days)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                className="font-mono border-retro-brown/20 focus:border-retro-sage"
                placeholder="30"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-retro-sage hover:bg-retro-olive text-white font-mono transition-colors duration-300"
          >
            Submit Listing
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
