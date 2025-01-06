'use client';

import {useEffect, useState} from 'react'
import {ListingCard, ListingCardProps} from "./ListingCard";
import {useContract} from "@/hooks/useContract";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '@/types/contract';
import {useReadContracts} from "wagmi";
import {Address} from "viem";

function parseListingDetails(id: number, data: any): ListingCardProps {
  return {
    id: id,
    creator: data[0] as string,
    listingType: data[1] as number,
    status: data[2] as number,
    descriptionHash: data[3] as string,
    price: data[4] as bigint,
    duration: data[5] as bigint,
    createdAt: data[6] as bigint,
    matchedWith: data[7] as string,
    deliveredAt: data[8] as bigint,
  };
}

export default function HelpRequestList() {
  const [listings, setListings] = useState<ListingCardProps[]>([]);

  const {
    readData: listingCounter,
    refetch: refetchListingCounter,
  } = useContract({
    functionName: 'listingCounter'
  });

  const contractCalls = Array.from({length: Number(listingCounter)}).map(
    (_, index) => ({
      abi: CONTRACT_ABI,
      address: CONTRACT_ADDRESS as Address,
      functionName: "getListingDetails",
      args: [index + 1],
    })
  );

  const {
    data: readListings,
    refetch: refetchListings,
  } = useReadContracts({
    contracts: contractCalls,
  });

  // Manual refetch on interval
  useEffect(() => {
    let isRefetching = false;

    const interval = setInterval(async () => {
      if (isRefetching) {
        console.log('Skipping refetch - previous request still in progress');
        return;
      }

      try {
        isRefetching = true;
        await refetchListingCounter();
        await refetchListings();
        console.log('Refetch successful');
      } catch (error) {
        console.error('Refetch failed:', error);
      } finally {
        isRefetching = false;
      }
    }, 10_000); // 10 sec

    return () => clearInterval(interval);
  }, [refetchListingCounter, refetchListings]);

  useEffect(() => {
    if (!readListings) {
      return;
    }

    const list = readListings.map((listing, index) => {
      return parseListingDetails(index + 1, listing.result);
    });
    list.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0));

    setListings(list);
  }, [readListings]);

  const onActionCallback = async (id: number) => {
    console.log('on action', id);
  }

  if (!listingCounter || !readListings) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {listings.map((listing, index) => (
        <ListingCard key={index} onActionCallback={onActionCallback} {...listing} />
      ))}
    </div>
  )
}
