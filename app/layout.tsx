import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './auth/Provider'
import NavBar from './components/NavBar'
import users from './services/users'
import { CanceledError } from './services/api-client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <NavBar/>
            {children}
          </AuthProvider>
      </body>
    </html>
  )
}
