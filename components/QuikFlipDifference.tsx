'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, RefreshCw } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 transform transition-all duration-300 ease-out"
      whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
      <motion.div
        className="mt-4 h-1 bg-blue-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const QuikFlipDifference = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="difference" className="bg-gray-950 py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block"
          >
            The QuikFlip <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 ">Difference</span>
            {/* <motion.div
              className="absolute bottom-0 left-0 h-1 bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            /> */}
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-xl text-blue-200 mt-4"
          >
            What sets us apart in the world of crypro payments
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Zap size={48} />}
            title="Lightning-Fast"
            description="Experience near-instant crypto payment acceptances and fiat currency payouts."
          />
          <FeatureCard
            icon={<Shield size={48} />}
            title="Bank-Grade Security"
            description="Your business information is hidden from us. You choose how to integrate with our API."
          />
          <FeatureCard
            icon={<Clock size={48} />}
            title="24/7 Availability"
            description="Our customer support is always available to personally help with business issues and integration issues."
          />
          <FeatureCard
            icon={<RefreshCw size={48} />}
            title="Optimized For You"
            description="Our system is built to work with both in-person and online POS systems, optimizing the experience for your needs."
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px] pointer-events-none" />
    </section>
  );
};

export default QuikFlipDifference;