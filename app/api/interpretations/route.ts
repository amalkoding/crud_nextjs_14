import client from '@/libs/appwrite_client'
import { Databases, ID, Query } from 'appwrite'
import { NextResponse } from 'next/server'

const database = new Databases(client)

async function createInterpretation(data: {
    term: string
    interpretation: string
}) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            ID.unique(),
            data
        )
        return response
    } catch (error) {
        console.error('error creating interpretations', error)
        throw new Error('failed to create interpretations')
    }
}

async function fetchInterpretations() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            [Query.orderDesc('$createdAt')]
        )
        return response.documents
    } catch (error) {
        console.error('error fetching interpretations', error)
        throw new Error('failed to fetch interpretations')
    }
}

export async function POST(req: Request) {
    try {
        const { term, interpretation } = await req.json()
        const data = { term, interpretation }
        await createInterpretation(data)
        return NextResponse.json({
            message: 'interpretation created',
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: 'failed to create interpretation',
            },
            {
                status: 500,
            }
        )
    }
}

export async function GET() {
    try {
        const interpretations = await fetchInterpretations()
        return NextResponse.json(interpretations)
    } catch (error) {
        return NextResponse.json(
            {
                error: 'failed to fetch interpretation',
            },
            {
                status: 500,
            }
        )
    }
}
