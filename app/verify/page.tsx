"use client"

import { useSignIn } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Image from "next/image"

// Create a separate component for the verification form
const VerificationForm = () => {
  const { signIn, setActive } = useSignIn()
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  useEffect(() => {
    if (!email) {
      router.push("/login")
      return
    }

    if (!isCodeSent) {
      async function createVerification() {
        try {
          await signIn?.create({
            identifier: email,
            strategy: "email_code",
          })
          setIsCodeSent(true)
        } catch (err) {
          console.error("Error sending verification email:", err)
          setError("Failed to send verification code. Please try again.")
        }
      }

      createVerification()
    }
  }, [email, router, signIn, isCodeSent])

  const handleVerification = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!verificationCode) {
      setError("Please enter the verification code")
      setLoading(false)
      return
    }

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code: verificationCode,
      })

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
      } else {
        setError("Verification failed. Please try again.")
      }
    } catch (err) {
      console.error("Error during verification:", err)
      setError("Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setLoading(true)
      await signIn?.create({
        identifier: email,
        strategy: "email_code",
      })
      setError("")
      setIsCodeSent(true)
    } catch (err) {
      console.error("Error resending code:", err)
      setError("Failed to resend code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="flex flex-col items-center">
        <Image src="/lightlogo.png" alt="Logo" width={60} height={60} />
        <h2 className="mt-6 text-3xl font-bold text-center">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-neutral-400 text-center">
          We sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleVerification} className="mt-8 space-y-6">
        <div>
          <label htmlFor="code" className="sr-only">
            Verification Code
          </label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="Enter verification code"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        <button
          type="button"
          onClick={handleResendCode}
          disabled={loading}
          className="w-full text-sm text-blue-600 hover:text-blue-500 focus:outline-none disabled:opacity-50"
        >
          Resend verification code
        </button>
      </form>
    </div>
  )
}

// Main VerifyPage component
const VerifyPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationForm />
      </Suspense>
    </main>
  )
}

export default VerifyPage