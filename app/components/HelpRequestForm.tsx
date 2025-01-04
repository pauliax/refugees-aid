'use client';

import React from 'react'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function HelpRequestForm() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        needType: '',
        description: '',
    })
    const { address } = useAccount()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this data to your backend
        console.log('Form submitted:', { ...formData, walletAddress: address })
        // Reset form after submission
        setFormData({ name: '', location: '', needType: '', description: '' })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Location
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="needType">
                    Type of Need
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="needType"
                    name="needType"
                    value={formData.needType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a need</option>
                    <option value="housing">Housing</option>
                    <option value="food">Food</option>
                    <option value="medical">Medical Assistance</option>
                    <option value="legal">Legal Aid</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit Request
                </button>
            </div>
        </form>
    )
}
