'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useUser } from '@clerk/nextjs'

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
  itemVariants: Variants;
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const navbarVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950 bg-opacity-90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div variants={itemVariants} className="flex items-center">
            <HomeLink isScrolled={isScrolled} />
            <div className="hidden md:flex md:space-x-8 ml-10">
              <NavLink href="/#features" isScrolled={isScrolled} itemVariants={itemVariants}>Features</NavLink>
              <NavLink href="/#integration" isScrolled={isScrolled} itemVariants={itemVariants}>Integration</NavLink>
              <NavLink href="/#difference" isScrolled={isScrolled} itemVariants={itemVariants}>Why Us?</NavLink>
              <NavLink href="/#contact" isScrolled={isScrolled} itemVariants={itemVariants}>Contact</NavLink>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="hidden md:flex items-center space-x-4">
            <Link href={isSignedIn ? "/dashboard" : "/log-in"} className={`inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md ${
              isScrolled ? 'text-blue-400 bg-gray-950' : 'text-white bg-blue-500'
            } hover:bg-blue-500 hover:text-white hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
              {isSignedIn ? 'Dashboard' : 'Log In'}
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </motion.div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden shadow-md"
        >
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            isScrolled ? 'bg-gray-950' : 'bg-gray-950 bg-opacity-90 backdrop-blur-sm'
          }`}>
            <MobileNavLink href="/#features" isScrolled={isScrolled}>Features</MobileNavLink>
            <MobileNavLink href="/#integration" isScrolled={isScrolled}>Integration</MobileNavLink>
            <MobileNavLink href="/#difference" isScrolled={isScrolled}>Why Us?</MobileNavLink>
            <MobileNavLink href="/#contact" isScrolled={isScrolled}>Contact</MobileNavLink>
            <Link href={isSignedIn ? "/dashboard" : "/log-in"} className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-[#212121] bg-blue-500 hover:bg-blue-600">
              {isSignedIn ? 'Dashboard' : 'Log In'}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

const HomeLink: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <a 
    href="/#hero" 
    onClick={(e) => smoothScroll(e, 'hero')}
    className="flex items-center mr-8"
  >
    <Image src="/lightlogo.png" alt="Logo" width={32} height={32} className="mr-2" />
    <span className="text-2xl font-bold text-white">
      <span className={`${isScrolled ? 'text-blue-400' : 'text-blue-500'}`}>Quik</span>Flip
    </span>
  </a>
);

const NavLink: React.FC<NavLinkProps> = ({ href, children, isScrolled, itemVariants }) => (
  <motion.div variants={itemVariants}>
    <a 
      href={href} 
      onClick={(e) => smoothScroll(e, href.replace('/#', ''))}
      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
        isScrolled ? 'text-white hover:text-white hover:bg-blue-500 rounded p-1 pb-1 px-2 duration-300' : 'text-white hover:text-blue-200 duration-300'
      }`}
    >
      {children}
    </a>
  </motion.div>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, isScrolled }) => (
  <a 
    href={href} 
    onClick={(e) => smoothScroll(e, href.replace('/#', ''))}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      isScrolled ? 'text-blue-400 hover:bg-gray-800 hover:text-blue-300 duration-300' : 'text-white hover:bg-gray-800 hover:text-blue-300 duration-300'
    }`}
  >
    {children}
  </a>
);

export default Navbar;