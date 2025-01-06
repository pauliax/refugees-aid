'use client';

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Ban, Calendar, Clock, Coins, HandshakeIcon, Package, User} from "lucide-react";
import {
  formatAddress,
  getAddressLink,
  isEmptyAddress,
  secondsToHours,
  translateListingStatus,
  translateListingType
} from "@/utils/utility-functions";
import {formatEther} from 'viem';
import {format} from "date-fns";

export interface ListingCardProps {
  id: number;
  creator: string;
  listingType: number;
  status: number;
  descriptionHash: string;
  price: bigint;
  duration: bigint;
  createdAt: bigint;
  matchedWith?: string;
  deliveredAt?: bigint;
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
            <span>{formatEther(listing.price)} GRASS</span>
          </div>
          <div className="flex items-center text-retro-brown/80">
            <Clock className="w-4 h-4 mr-2"/>
            <span>{secondsToHours(listing.duration)} hours</span>
          </div>
        </div>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-center text-retro-brown/80">
            <User className="w-4 h-4 mr-2"/>
            <span>Created by: <a href={getAddressLink(listing.creator)}
                                 target="_blank">{formatAddress(listing.creator)}</a></span>
          </div>
          {!isEmptyAddress(listing.matchedWith) && (
            <div className="flex items-center text-retro-brown/80">
              <HandshakeIcon className="w-4 h-4 mr-2"/>
              <span>Matched with: <a href={getAddressLink(listing.matchedWith)}
                                     target="_blank">{formatAddress(listing.matchedWith)}</a></span>
            </div>
          )}
          <div className="flex items-center text-retro-brown/80">
            <Calendar className="w-4 h-4 mr-2"/>
            <span>Created: {format(Number(listing.createdAt) * 1000, 'MMM d, yyyy HH:mm')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
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
      </CardFooter>
    </Card>
  );
};
