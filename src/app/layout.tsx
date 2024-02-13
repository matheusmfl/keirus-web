import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montSerrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Keirus App',
  description: 'Login | Keirus Admin |',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montSerrat.className}>{children}</body>
    </html>
  )
}
