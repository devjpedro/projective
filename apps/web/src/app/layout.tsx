import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next SaaS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={'antialiased'}>{children}</body>
    </html>
  )
}
