import React from 'react';

const IntegrationPage = () => {
  return (
    <main id="integration" className="min-h-screen w-full px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Integrated with the best
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
              Seamlessly integrated into your systems with top-notch providers in the transactions and payment space.
            </p>
          </div>

          {/* Integration Orbit Visualization */}
          <div className="w-full lg:w-1/2 relative aspect-square hover:scale-90 transition duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 from-30% via-blue-600 via-55% to-gray-900/50 to-80% rounded-full"></div>
            
            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <img src="/lightlogo.png" alt="QuikFlip Logo" className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-spin-slow">
              {/* Inner Circle */}
              <div className="absolute top-1/2 left-1/2 w-48 h-48 -mt-24 -ml-24 border-2 border-dashed border-gray-200 rounded-full"></div>
              
              {/* Outer Circle */}
              <div className="absolute top-1/2 left-1/2 w-80 h-80 -mt-40 -ml-40 border-2 border-dashed border-gray-200 rounded-full"></div>

              {/* Orbiting Logos */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-28 h-16 bg-none rounded-full flex items-center justify-center">
                  <img src="/stripe_emblem.png" alt="Stripe Logo" className="w-32 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-none rounded-full flex items-center justify-center">
                  <img src="/coinbase_emblem.webp" alt="Coinbase Logo" className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IntegrationPage;