import type { Metadata } from 'next'
import '@/app/globals.css'
import { AsideNavMenu } from './components/AsideNavMenu'
import { Footer } from './components/Footer'

export const metadata: Metadata = {
  title: 'Keirus Dashboard',
  description: 'Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section>
      <AsideNavMenu />
      <main className="ml-[218px] bg-[#F6F6F9]">
        {children}
        <Footer />
      </main>
    </section>
  )
}
