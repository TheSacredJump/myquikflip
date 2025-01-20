"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSignIn } from "@clerk/nextjs"

const LogIn = () => {
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const { signIn, isLoaded } = useSignIn()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter an email address')
      return
    }
    
    try {
      setIsLoading(true)
      setError('')

      if (!isLoaded) {
        return
      }

      // Start the sign-in process with email
      const result = await signIn.create({
        identifier: email,
      })

      // If successful, redirect to dashboard
      if (result.status === "complete") {
        router.push('/dashboard')
      } else {
        // Handle other cases - like if email needs verification
        router.push(`/verify?email=${encodeURIComponent(email)}`)
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Invalid email or account not found')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='min-h-screen flex flex-col md:flex-row items-center justify-center w-full overflow-hidden px-4 md:px-0'>
        <div 
          className={`w-full md:w-1/2 flex items-center justify-center py-8 md:py-0 transform transition-all duration-1000 ease-out
            ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        >
            <h1 className='text-4xl md:text-6xl text-bold leading-[3rem] md:leading-[4rem] text-center md:text-left'>
                <span className={`block transform transition-all duration-700 delay-500 ease-out
                  ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  Crypto Payments,
                </span>
                <span className={`text-blue-500 block transform transition-all duration-700 delay-700 ease-out
                  ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  Simplified
                </span>
            </h1>
        </div>

        <div className={`w-full md:w-1/2 flex flex-col justify-center items-center md:items-start transform transition-all duration-1000 ease-out
          ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className='flex flex-row gap-x-2 items-center'>
                <div className={`transform transition-all duration-500 delay-300 ease-out
                  ${mounted ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                    <Image src="/lightlogo.png" alt="Login" width={60} height={60} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold text-[#3b82f6] transform transition-all duration-500 delay-400 ease-out
                  ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                    QuikFlip
                </h2>
            </div>
            
            <h2 className={`text-xl md:text-2xl font-bold mt-10 text-center md:text-left transform transition-all duration-500 delay-500 ease-out
              ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Sign into your QuikFlip account
            </h2>
            
            <p className={`text-sm text-neutral-400 mt-2 text-center md:text-left transform transition-all duration-500 delay-600 ease-out
              ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Not registed yet?{" "} 
                <Link href="/get-started">
                    <span className='text-blue-400 hover:text-blue-500 transition duration-200'>
                        Bring QuikFlip to your business
                    </span>
                </Link>
            </p>

            <form onSubmit={handleSubmit} className="w-full md:w-1/2">
              <h3 className={`text-neutral-200 mt-6 transform transition-all duration-500 delay-700 ease-out
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  Organization email address
              </h3>
              
              <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`text-black border-2 border-gray-200 rounded-lg p-3 mt-2 w-full
                      transform transition-all duration-500 delay-800 ease-out hover:border-blue-400 focus:border-blue-500 
                      focus:outline-none focus:ring-2 focus:ring-blue-200
                      ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                  placeholder='youremail@myquikflip.com'
              />
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              
              <button 
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#3b82f6] text-white font-semibold py-3 px-6 mt-6 rounded-lg
                      hover:bg-[#3b82f6]/90 hover:scale-105 transform transition-all duration-500 delay-900 ease-out
                      focus:outline-none focus:ring-2 focus:ring-blue-300 w-full
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
        </div>
    </main>
  )
}

export default LogIn