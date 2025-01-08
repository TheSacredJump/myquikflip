'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Percent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center text-gray-300 mb-4">
    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const PricingSection = () => {
  return (
    <section id='pricing' className="bg-gray-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            No subscriptions, no hidden fees. Just pay for what you use.
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg border border-blue-500/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Percent size={48} className="text-blue-500 mr-4" />
            <h3 className="text-3xl font-bold text-white">1% per conversion</h3>
          </div>
          
          <p className="text-center text-gray-300 mb-8">
            We charge a simple 1% fee on the amount converted. No hidden costs, no surprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">What&apos;s Included:</h4>
              <ul>
                <FeatureItem>Lightning-fast conversions</FeatureItem>
                <FeatureItem>Bank-grade security</FeatureItem>
                <FeatureItem>24/7 availability</FeatureItem>
                <FeatureItem>Real-time rate optimization</FeatureItem>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">How It Works:</h4>
              <ul>
                <FeatureItem>Convert any amount, any time</FeatureItem>
                <FeatureItem>Pay only for successful conversions</FeatureItem>
                <FeatureItem>No minimum fees or hidden charges</FeatureItem>
                <FeatureItem>Transparent fee structure</FeatureItem>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-2">Example:</h4>
            <p className="text-gray-300">
              If you pay for coffee worth $10, you will pay for $10.10 worth of the crypto of your choice (1% of $10).
            </p>
          </div>
        
          <Link href="/get-started">
          <motion.button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Converting Now
            <ArrowRight className="ml-2" size={20} />
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;