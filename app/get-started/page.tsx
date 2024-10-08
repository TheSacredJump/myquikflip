'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Building, CreditCard, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Waitlist = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    cryptoExperience: '',
    primaryCrypto: '',
    interest: '',
    message: '',
    subscribe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const router = useRouter();

  useEffect(() => {
    let redirectTimer: any;
    let countdownTimer: any;

    if (submitStatus === 'success' && typeof window !== 'undefined') {
      countdownTimer = setInterval(() => {
        setRedirectCountdown((prevCount) => prevCount - 1);
      }, 1000);

      redirectTimer = setTimeout(() => {
        router.push('/');
      }, 3000);
    }

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownTimer);
    };
  }, [submitStatus, router]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData(e.target);
      
      // Correctly handle the subscribe checkbox
      formDataToSend.set('subscribe', formData.subscribe ? 'yes' : 'no');

      const response = await fetch('https://getform.io/f/awngjzob', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          organization: '',
          cryptoExperience: '',
          primaryCrypto: '',
          interest: '',
          message: '',
          subscribe: false
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <main className='w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 from-30% via-blue-900 via-55% to-gray-900 to-80% p-4'>
      <motion.div
        className='max-w-2xl w-full bg-gray-950 rounded-lg shadow-xl overflow-hidden'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className='p-8'>
          <motion.h2 variants={itemVariants} className='text-3xl font-bold text-center mb-2 text-white'>Join QuikFlip Waitlist</motion.h2>
          <motion.p variants={itemVariants} className='text-center text-gray-300 mb-6'>Be among the first to experience seamless crypto-to-fiat conversions!</motion.p>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-300 mb-1'>First Name</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                    placeholder='John'
                    required
                  />
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-300 mb-1'>Last Name</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                    placeholder='Doe'
                    required
                  />
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-1'>Email Address</label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                  placeholder='john@example.com'
                  required
                />
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor='organization' className='block text-sm font-medium text-gray-300 mb-1'>Organization (Optional)</label>
              <div className='relative'>
                <input
                  type='text'
                  id='organization'
                  name='organization'
                  value={formData.organization}
                  onChange={handleChange}
                  className='w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                  placeholder='Company Name'
                />
                <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='cryptoExperience' className='block text-sm font-medium text-gray-300 mb-1'>Crypto Experience</label>
                <select
                  id='cryptoExperience'
                  name='cryptoExperience'
                  value={formData.cryptoExperience}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                  required
                >
                  <option value=''>Select your experience level</option>
                  <option value='Beginner'>Beginner</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Advanced'>Advanced</option>
                  <option value='Expert'>Expert</option>
                </select>
              </div>
              <div>
                <label htmlFor='primaryCrypto' className='block text-sm font-medium text-gray-300 mb-1'>Primary Cryptocurrency</label>
                <div className='relative'>
                  <input
                    type='text'
                    id='primaryCrypto'
                    name='primaryCrypto'
                    value={formData.primaryCrypto}
                    onChange={handleChange}
                    className='w-full pl-10 pr-3 py-2 borderrounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                    placeholder='e.g., Bitcoin, Ethereum'
                    required
                  />
                  <CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor='interest' className='block text-sm font-medium text-gray-300 mb-1'>Primary Interest in QuikFlip</label>
              <select
                id='interest'
                name='interest'
                value={formData.interest}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                required
              >
                <option value=''>Select your primary interest</option>
                <option value='Convenience'>Instant Conversions</option>
                <option value='Rates'>Competitive Exchange Rates</option>
                <option value='Spending'>Everyday Crypto Spending</option>
                <option value='Integration'>Integration with Existing Wallets</option>
                <option value='Other'>Other</option>
              </select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-1'>Additional Comments (Optional)</label>
              <div className='relative'>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className='w-full pl-10 pr-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900 border-gray-800 text-white transition-all duration-300 ease-in-out'
                  placeholder='Tell us more about your needs or questions...'
                ></textarea>
                <MessageSquare className='absolute left-3 top-3 text-gray-400 h-5 w-5' />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className='flex items-center'>
              <input
                type='checkbox'
                id='subscribe'
                name='subscribe'
                checked={formData.subscribe}
                onChange={handleChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 ease-in-out'
              />
              <label htmlFor='subscribe' className='ml-2 block text-sm text-gray-300'>
                Keep me updated on QuikFlip developments and early access opportunities
              </label>
            </motion.div>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              className='w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
              <Send className='ml-2 h-4 w-4' />
            </motion.button>
          </form>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 text-green-400 text-center'
            >
              <p>Thank you for joining our waitlist!</p>
              <p className='text-sm mt-2'>Redirecting to home page in {redirectCountdown} seconds...</p>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='mt-4 text-red-400 text-center'
            >
              There was an error submitting your form. Please try again.
            </motion.p>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default Waitlist;