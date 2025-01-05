'use client';

import { useState, useEffect } from 'react'

interface HelpRequest {
    id: number
    name: string
    location: string
    needType: string
    description: string
}

export default function HelpRequestList() {
    const [requests, setRequests] = useState<HelpRequest[]>([])

    useEffect(() => {
        // In a real application, you would fetch this data from your API
        const mockRequests: HelpRequest[] = [
            { id: 1, name: "John Doe", location: "Kyiv, Ukraine", needType: "Housing", description: "Need temporary shelter for a family of 4" },
            { id: 2, name: "Jane Smith", location: "Lviv, Ukraine", needType: "Medical", description: "Require insulin for diabetes treatment" },
            { id: 3, name: "Alex Johnson", location: "Odessa, Ukraine", needType: "Food", description: "Looking for food supplies for elderly neighbors" },
        ]
        setRequests(mockRequests)
    }, [])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
                <div key={request.id} className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">{request.name}</h2>
                    <p className="text-gray-600 mb-2">{request.location}</p>
                    <p className="text-blue-600 font-medium mb-2">{request.needType}</p>
                    <p className="text-gray-700">{request.description}</p>
                </div>
            ))}
        </div>
    )
}
