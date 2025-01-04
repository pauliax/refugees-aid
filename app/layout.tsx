import type { Metadata } from 'next'
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google'
import '../styles/globals.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Refugee Help Portal',
    description: 'A platform for war refugees to seek and receive help',
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <Header />
            <main className="flex-grow">{props.children}</main>
            <Footer />
        </Providers>
        </body>
        </html>
    )
}
