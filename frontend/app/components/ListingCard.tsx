'use client';

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Ban, Clock, Coins, HandshakeIcon, Package} from "lucide-react";
import {translateListingStatus, translateListingType} from "@/utils/utility-functions";

export interface ListingCardProps {
  id: number;
  creator: string;
  listingType: number;
  status: number;
  descriptionHash: string;
  price: bigint;
  duration: bigint;
  createdAt: bigint;
  matchedWith: string;
  deliveredAt: bigint;
}

export const ListingCard = (listing: ListingCardProps) => {
  if (!listing || !listing.id) {
    return <div></div>;
  }

  const handleAction = (action: string) => {
    console.log(`${action} listing`, listing);
  };

  return (
    <Card className="w-full bg-retro-cream border-retro-brown/20 animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg text-retro-brown">
            {translateListingType(listing.listingType)}
          </CardTitle>
          <Badge
            variant="outline"
            className="font-mono text-xs border-retro-sage text-retro-sage"
          >
            {translateListingStatus(listing.status)}
          </Badge>
        </div>
        <CardDescription className="font-mono text-sm text-retro-brown/70">
          {listing.descriptionHash}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm font-mono">
          <div className="flex items-center text-retro-brown/80">
            <Coins className="w-4 h-4 mr-2"/>
            <span>{listing.price} GRASS</span>
          </div>
          <div className="flex items-center text-retro-brown/80">
            <Clock className="w-4 h-4 mr-2"/>
            <span>{listing.duration} days</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleAction("cancel")}
          variant="outline"
          className="font-mono border-retro-brown/20 hover:bg-retro-brown/5"
        >
          <Ban className="w-4 h-4 mr-2"/>
          Cancel
        </Button>
        <Button
          onClick={() => handleAction("match")}
          className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
        >
          <HandshakeIcon className="w-4 h-4 mr-2"/>
          Match
        </Button>
        <Button
          onClick={() => handleAction("deliver")}
          variant="outline"
          className="font-mono border-retro-brown/20 hover:bg-retro-brown/5"
        >
          <Package className="w-4 h-4 mr-2"/>
          Deliver
        </Button>
        <Button
          onClick={() => handleAction("collect")}
          className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
        >
          <Coins className="w-4 h-4 mr-2"/>
          Collect
        </Button>
      </CardFooter>
    </Card>
  );
};
