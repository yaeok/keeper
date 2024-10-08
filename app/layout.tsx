import type { Metadata } from 'next'
import '@/app/globals.css'

import { Inter } from 'next/font/google'

import { AuthContextProvider } from '@/provider/auth_context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KeePer -モチベーション維持',
  description:
    'KeePerは、ユーザのモチベーションを維持・管理するためのサービスです。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  )
}
