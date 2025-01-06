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
import {useAccount} from "wagmi";
import {useContract} from "@/hooks/useContract";

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
  onActionCallback?: (id: number) => void;
}

export const ListingCard = (listing: ListingCardProps) => {
  const {address} = useAccount();

  const {handleWrite: cancelListing} = useContract({
    functionName: 'cancelListing',
    args: [listing.id]
  });

  const {handleWrite: matchListing} = useContract({
    functionName: 'matchListing',
    args: [listing.id]
  });

  const {handleWrite: acceptDelivery} = useContract({
    functionName: 'acceptDelivery',
    args: [listing.id]
  });

  if (!listing || !listing.id) {
    return <div></div>;
  }

  const handleAction = (action: string) => {
    console.log(`${action} listing`, listing);

    switch (action) {
      case 'cancel':
        writeAction(cancelListing).then(r => console.log("Cancelled", r));
        break;
      case 'match':
        writeAction(matchListing).then(r => console.log("Matched", r));
        break;
      case 'deliver':
        writeAction(acceptDelivery).then(r => console.log("Delivered", r));
        break;
      default:
        console.warn('Unknown action', action);
        break;
    }
  };

  const writeAction = async (action: any) => {
    try {
      const {error} = await action?.() || {};

      if (error) {
        console.error('Contract write error:', error);
      } else {
        if (listing.onActionCallback) {
          listing.onActionCallback(listing.id);
        }
      }
    } catch (e) {
      console.error('Transaction failed:', e);
    }
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
        {listing.status === 1 && listing.creator === address && <Button
            onClick={() => handleAction("cancel")}
            variant="outline"
            className="font-mono border-retro-brown/20 hover:bg-retro-brown/5"
        >
            <Ban className="w-4 h-4 mr-2"/>
            Cancel
        </Button>
        }
        {listing.status === 1 && listing.creator !== address && !isEmptyAddress(address) && <Button
            onClick={() => handleAction("match")}
            className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
        >
            <HandshakeIcon className="w-4 h-4 mr-2"/>
            Match
        </Button>
        }
        {listing.status === 2 && (listing.listingType == 0 ? listing.creator === address : listing.matchedWith === address) &&
            <Button
                onClick={() => handleAction("deliver")}
                variant="outline"
                className="font-mono bg-retro-sage hover:bg-retro-olive text-white"
            >
                <Package className="w-4 h-4 mr-2"/>
                Deliver
            </Button>
        }
      </CardFooter>
    </Card>
  );
};
