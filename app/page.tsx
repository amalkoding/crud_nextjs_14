"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretations {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const [interpretations, setInterpretations] = useState<IInterpretations[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/interpretations')
        if (!response.ok) {
          throw new Error('failed to fetch interpretations')
        }
        const data = await response.json()
        setInterpretations(data)
        setIsLoading(false)
      } catch (error) {
        console.log("error: ", error)
        setError('failed to fetch interpretations, please reloading your page')
      } finally {
        setIsLoading(false);
      }
    }
    fetchInterpretations()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: 'DELETE' });
      setInterpretations((prevInterpretations) =>
        prevInterpretations?.filter((i) => i.$id !== id)
      );
    } catch (error) {
      setError("failed to delete interpretations, please try again")
    }
  }

  return (
    <div className="py-3 text-lg">
      {error && <p className="py-2 text-red-500">{error}</p>}
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : interpretations && interpretations?.length > 0 ? (
        <div>
          {interpretations?.map((interpretation) => (
            <div key={interpretation.$id} className="bg-white border p-3 my-2">
              <h1 className="font-bold">{interpretation.term}</h1>
              <p>{interpretation.interpretation}</p>
              <div className="flex justify-end items-center gap-2 pt-2">
                <Link className="bg-slate-200 hover:bg-slate-300 text-sm px-3 py-2" href={`/edit/${interpretation.$id}`}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(interpretation.$id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No interpretation found</p>
      )}
    </div>
  );
}
