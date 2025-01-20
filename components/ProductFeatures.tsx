"use client";

import React from 'react'

const ProductLanding = () => {
  return (
    <main id='features' className="min-h-screen w-full bg-gradient-to-br px-4 md:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mb-14 bg-gradient-to-br from-gray-900/50 from-30% via-blue-600 via-55% to-gray-900/50 to-80% rounded-3xl p-8 py-24 hover:scale-90 transition duration-300 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-neutral-300 text-xl md:text-2xl mb-4 mt-14 lg:mt-24">Simple and Easy</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight mb-14 lg:mb-24">
              All your payments in one place
            </h1>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl absolute -top-5 hover:scale-105 hover:translate-y-[-50px] transition duration-300 lg:mr-10">
              <img
                src="/dashboard.png"
                alt="Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {/* Integration Card */}
        <div className="bg-gradient-to-r from-gray-900/50 from-30% via-purple-600 via-55% to-gray-900/50 to-80% rounded-3xl p-8 text-white hover:scale-90 transition duration-300 h-96 overflow-hidden">
          <h2 className="text-3xl font-semibold mb-4">Integration</h2>
          <p className="text-xl mb-8">
            Integrate directly into existing payment systems
          </p>
          <div className="bg-white rounded-xl p-4 hover:translate-x-8 transition duration-300">
            <div>
            </div>
            <img 
              src="/api-integration.png"
              alt="Scheduling Feature"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-gradient-to-t from-gray-900/50 from-30% via-purple-600 via-55% to-gray-900/50 to-80% rounded-3xl p-8 text-white hover:scale-90 transition duration-300 h-96 overflow-hidden">
          <h2 className="text-3xl font-semibold mb-4">Onboarding</h2>
          <p className="text-xl mb-8">
            Quick and painless onboarding process
          </p>
          <div className="bg-transparent rounded-xl p-4">
            <div className="space-y-4">
              <div className="bg-purple-100/75 rounded-lg p-3 hover:translate-x-8 transition duration-300">
                <p className="text-neutral-900">Notifications</p>
                <p className="text-purple-600 text-sm">Satoshi paid 0.0016 ETH for coffee!</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 hover:translate-x-[-32px] transition duration-300">
                <p className="text-neutral-900">Instant Payouts</p>
                <p className="text-purple-600 text-sm">Powered by Stripe</p>
              </div>
              <div className="bg-purple-100/50 rounded-lg p-3 hover:translate-x-8 transition duration-300">
                <p className="text-neutral-800">Secure Integration</p>
                <p className="text-purple-600 text-sm"></p>
              </div>
            </div>
          </div>
        </div>

        {/* Management Card */}
        <div className="bg-gradient-to-l from-gray-900/50 from-30% via-purple-600 via-55% to-gray-900/50 to-80% rounded-3xl p-8 text-white hover:scale-90 transition duration-300 h-96 overflow-hidden">
          <h2 className="text-3xl font-semibold mb-4">Customizable</h2>
          <p className="text-xl mb-8">
            Tailored to your specific needs
          </p>
          <div className="bg-white rounded-xl hover:translate-x-[-32px] transition duration-300">
            <img 
              src="/docs.png"
              alt="Management Feature"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="bg-white rounded-xl mt-4 hover:translate-x-[-32px] transition duration-300">
            <img 
              src="/docs2.png"
              alt="Management Feature"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductLanding