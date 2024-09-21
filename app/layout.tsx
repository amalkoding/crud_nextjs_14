import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Link from 'next/link'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'CRUD - NextJs 14',
  description: 'Make simple crud in nextjs 14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-900 antialiased`}
      >
        <div className="w-10/12 mx-auto">
          <header className="bg-white border-b flex justify-between items-center px-6 py-4 mt-4">
            <h1 className="text-slate-900 font-bold text-3xl">CRUD</h1>
            <Link className="bg-slate-900 hover:bg-slate-950 text-white grid align-center px-3 py-2" href={'/create'}>Create</Link>
          </header>
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  )
}
