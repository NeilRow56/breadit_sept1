import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import Providers from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'light bg-white text-slate-900 antialiased',
        inter.className
      )}
    >
      <body className="flex h-screen flex-col bg-gray-100 antialiased">
        <Providers>
          <Navbar />
          <div className="container mx-auto flex max-w-7xl flex-grow  ">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
