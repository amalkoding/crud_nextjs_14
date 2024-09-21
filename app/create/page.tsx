"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

export default function Create() {
    const [formData, setFormData] = useState({ term: '', interpretation: '' })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.term || !formData.interpretation) {
            setError('please fill in all the fields')
            return;
        }

        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch('/api/interpretations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('failed to create interpretation')
            }

            router.push('/')
        } catch (error) {
            console.log("error: ", error)
            setError('failed to create interpretations, please try again')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="py-3 text-lg">
            <div className="bg-white border p-3 my-2">
                <h1 className="font-bold text-xl">Create Data</h1>
                {error && <p className='text-red-500 mt-2'>{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div>
                        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                            Term
                        </label>
                        <input
                            type="text"
                            id="term"
                            name="term"
                            value={formData.term}
                            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="interpretation" className="block text-sm font-medium text-gray-700">
                            Interpretation
                        </label>
                        <textarea
                            id="interpretation"
                            name="interpretation"
                            value={formData.interpretation}
                            rows={6}
                            className="mt-1 block w-full border border-gray-300 px-3 py-2 text-sm resize-none"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex justify-end items-center gap-2 pt-2">
                        <Link className="bg-slate-200 hover:bg-slate-300 text-sm px-3 py-2" href="/">
                            Back
                        </Link>
                        <button type="submit" className="bg-slate-900 hover:bg-slate-950 text-white text-sm px-3 py-2" disabled={isLoading}>
                            {isLoading ? 'Submiting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}
