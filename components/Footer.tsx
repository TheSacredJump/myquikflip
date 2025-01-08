'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer ref={ref} className="bg-gray-950 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants}>
            <div className='flex flex-row items-center space-x-2 mb-4'>
                <Image src="/darklogo.png" alt="QuikFlip Logo" width={35} height={35} />
                <h3 className="text-lg font-semibold text-white">QuikFlip</h3>
            </div>
            <p className="text-sm">Seamless crypto-to-fiat conversions for the modern world.</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="/#faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link href="/get-started" className="hover:text-blue-400 transition-colors">Join</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-700 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <p>&copy; {currentYear} QuikFlip. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;