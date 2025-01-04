'use client';

import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'

export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">Refugee Help Portal</Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/requests">Help Requests</Link></li>
                        <li><ConnectKitButton /></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
