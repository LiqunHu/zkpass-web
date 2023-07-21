import './globals.css'
import { Providers } from '@/lib/providers'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'zkTemplate Kit',
  description: 'zkTemplate Kit'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Navbar/>
          <main>{children}</main>
          </body>
      </html>
    </Providers>
  )
}
