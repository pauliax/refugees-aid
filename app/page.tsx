'use client';

import HelpRequestForm from './components/HelpRequestForm'

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Refugee Help Portal</h1>
          <p className="text-xl">A platform for war refugees to seek and receive assistance</p>
        </section>
        <HelpRequestForm />
      </div>
  )
}
