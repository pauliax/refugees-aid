'use client';

import { ConnectKitButton } from 'connectkit'

export default function Header() {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 12,
            }}
            className="bg-gray-100"
        >
            <ConnectKitButton />
        </header>
    );
}
