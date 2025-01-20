"use client"

import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import Link from 'next/link'


  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={`bg-gray-950 text-white antialiased`}>
            <SignedOut>
            <div className='text-white text-1xl flex flex-col space-y-5 items-center justify-center min-h-screen'>
                <h1>It seems you aren't signed in...</h1>
                <Link href="/log-in">
                <div className='px-4 py-2 bg-white text-black rounded-lg hover:scale-105 transition duration-300'>
                    Log In
                </div>
                </Link>
            </div>
            </SignedOut>
            <SignedIn>
              {children}
            </SignedIn>
          </body>
        </html>
      </ClerkProvider>
    )
  }