import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Syncopate } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import Providers from './providers';


const inter = Inter({ subsets: ['latin'] })

const bebas_neue = Bebas_Neue(
  { 
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
    variable: '--font-bebas-neue',
  }
)

export const syncopate = Syncopate({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-syncopate',
})


export const metadata: Metadata = {
  title: 'Wave OS',
  description: 'Vaporwave Web Operating System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bebas_neue.variable} ${syncopate.variable} !overflow-clip`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
