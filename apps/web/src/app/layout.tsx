import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next SaaS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
