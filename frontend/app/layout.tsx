import type {Metadata} from 'next'
import {type ReactNode} from 'react';
import {Inter} from 'next/font/google'
import '../styles/globals.css';
import {Providers} from './providers'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Refugee Aid Portal',
  description: 'A portal for refugees to seek and receive assistance',
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Providers>
      <main className="flex-grow">{props.children}</main>
    </Providers>
    </body>
    </html>
  )
}
