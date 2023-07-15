
import { Inter } from 'next/font/google'
import { TheHeader } from '@/components/TheHeader'
import { TheFooter } from '@/components/TheFooter'
import styled from './page.module.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe',
  description: 'Recipe list',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TheHeader />
        <main className={styled.container}>
          {children}
        </main>
        <TheFooter/>
      
      </body>
    </html>
  )
}
