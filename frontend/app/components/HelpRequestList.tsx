'use client';

import {useEffect, useState} from 'react'
import {ListingCard} from "./ListingCard";

interface HelpRequest {
  id: number
  name: string
  location: string
  needType: string
  description: string
}

const MOCK_LISTINGS = [
  {
    type: "Housing Assistance",
    description: "Need temporary accommodation for a family of 4 for 30 days",
    amount: "2.5",
    duration: "30",
    status: "active" as const,
  },
  {
    type: "Medical Support",
    description: "Seeking assistance for essential medical supplies",
    amount: "1.2",
    duration: "15",
    status: "matched" as const,
  },
  {
    type: "Food Aid",
    description: "Monthly food supplies needed for two adults",
    amount: "0.8",
    duration: "30",
    status: "delivered" as const,
  },
];

export default function HelpRequestList() {
  const [requests, setRequests] = useState<HelpRequest[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const mockRequests: HelpRequest[] = [
      {
        id: 1,
        name: "John Doe",
        location: "Kyiv, Ukraine",
        needType: "Housing",
        description: "Need temporary shelter for a family of 4"
      },
      {
        id: 2,
        name: "Jane Smith",
        location: "Lviv, Ukraine",
        needType: "Medical",
        description: "Require insulin for diabetes treatment"
      },
      {
        id: 3,
        name: "Alex Johnson",
        location: "Odessa, Ukraine",
        needType: "Food",
        description: "Looking for food supplies for elderly neighbors"
      },
    ]
    setRequests(mockRequests)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {MOCK_LISTINGS.map((listing, index) => (
        <ListingCard key={index} {...listing} />
      ))}
    </div>
  )
}
