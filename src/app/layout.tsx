import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

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
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <body className={montSerrat.className}>{children}</body>
    </html>
  )
}
