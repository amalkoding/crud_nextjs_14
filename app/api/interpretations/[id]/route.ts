import client from '@/libs/appwrite_client'
import { Databases } from 'appwrite'
import { NextResponse } from 'next/server'

const database = new Databases(client)

async function fetchInterpretation(id: string) {
    try {
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id
        )
        return interpretation
    } catch (error) {
        console.error('error fetching interpretations', error)
        throw new Error('failed to fetch interpretations')
    }
}

async function deleteInterpretation(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id
        )
        return response
    } catch (error) {
        console.error('error deleting interpretations', error)
        throw new Error('failed to delete interpretations')
    }
}

async function updateInterpretation(
    id: string,
    data: { term: string; interpretation: string }
) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            'interpretations',
            id,
            data
        )
        return response
    } catch (error) {
        console.error('error updating interpretations', error)
        throw new Error('failed to update interpretations')
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const interpretation = await fetchInterpretation(id)
        return NextResponse.json({ interpretation })
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

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        await deleteInterpretation(id)
        return NextResponse.json({
            message: 'interpretation deleted',
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: 'failed to delete interpretation',
            },
            {
                status: 500,
            }
        )
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const interpretation = await req.json()
        await updateInterpretation(id, interpretation)
        return NextResponse.json({
            message: 'interpretation updated',
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: 'failed to update interpretation',
            },
            {
                status: 500,
            }
        )
    }
}
