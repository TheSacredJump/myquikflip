'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WaitlistPromo = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="bg-gradient-to-bl from-gray-900/50 from-30% via-blue-600 via-55% to-gray-900/50 to-80% py-20 px-4 sm:px-6 lg:px-8 w-[95%] mx-auto rounded-lg overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-white mb-6"
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.6 }}
        >
          Be the First to Experience QuikFlip
        </motion.h2>
        <motion.p 
          className="text-xl text-blue-200 mb-8"
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our exclusive waitlist and get early access to the future of crypto payments.
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/get-started" passHref>
            <motion.div 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Waitlist
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
      <motion.div 
        className="mt-16 flex justify-center"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="relative space-y-4">
            <div className="p-5 bg-white/5 rounded-lg backdrop-blur-lg border border-white/10 shadow-xl">
              <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
              <div className="mt-4 h-4 w-1/2 bg-gray-700 rounded"></div>
            </div>
            <div className="p-5 bg-white/5 rounded-lg backdrop-blur-lg border border-white/10 shadow-xl">
              <div className="h-6 w-2/3 bg-gray-700 rounded"></div>
              <div className="mt-4 h-4 w-3/4 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WaitlistPromo;