'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Ban, HandshakeIcon, Package, Coins } from "lucide-react";

interface ListingCardProps {
  type: string;
  description: string;
  amount: string;
  duration: string;
  status: "active" | "matched" | "delivered" | "completed";
}

export const ListingCard = ({
                              type,
                              description,
                              amount,
                              duration,
                              status,
                            }: ListingCardProps) => {
  const handleAction = (action: string) => {
    console.log(`${action} listing`);
  };

  return (
    <Card className="w-full bg-retro-cream border-retro-brown/20 animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg text-retro-brown">
            {type}
          </CardTitle>
          <Badge
            variant="outline"
            className="font-mono text-xs border-retro-sage text-retro-sage"
          >
            {status}
          </Badge>
        </div>
        <CardDescription className="font-mono text-sm text-retro-brown/70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm font-mono">
          <div className="flex items-center text-retro-brown/80">
            <Coins className="w-4 h-4 mr-2" />
            <span>{amount} ETH</span>
          </div>
          <div className="flex items-center text-retro-brown/80">
            <Clock className="w-4 h-4 mr-2" />
            <span>{duration} days</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleAction("cancel")}
          variant="outline"
          className="font-mono border-retro-brown/20 hover:bg-retro-brown/5"
        >
          <Ban className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          onClick={() => handleAction("match")}
          className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
        >
          <HandshakeIcon className="w-4 h-4 mr-2" />
          Match
        </Button>
        <Button
          onClick={() => handleAction("deliver")}
          variant="outline"
          className="font-mono border-retro-brown/20 hover:bg-retro-brown/5"
        >
          <Package className="w-4 h-4 mr-2" />
          Deliver
        </Button>
        <Button
          onClick={() => handleAction("collect")}
          className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
        >
          <Coins className="w-4 h-4 mr-2" />
          Collect
        </Button>
      </CardFooter>
    </Card>
  );
};