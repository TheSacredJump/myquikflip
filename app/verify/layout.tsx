"use client"

import {
    ClerkProvider,
  } from '@clerk/nextjs'


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={` bg-gray-950 text-white antialiased`}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    )
  }