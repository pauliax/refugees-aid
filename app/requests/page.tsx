'use client';

import HelpRequestList from '../components/HelpRequestList'

export default function Requests() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Help Requests</h1>
            <HelpRequestList />
        </div>
    )
}
