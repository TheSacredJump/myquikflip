'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Globe, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData(e.target as HTMLFormElement);
      
      const response = await fetch('https://getform.io/f/amdpnzdb', {
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
          name: '',
          email: '',
          subject: '',
          message: ''
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

  const inputClasses = "w-full pl-10 pr-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300";

  return (
    <section id="contact" className="bg-gray-950 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        <motion.form 
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Your name"
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="your@email.com"
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-white mb-2">Subject</label>
            <div className="relative">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputClasses}
              placeholder="What's this about?"
              required
            />
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} h-32 resize-none`}
                placeholder="Your message here..."
                required
              ></textarea>
              <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                className="h-6 w-6 border-t-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="mr-2" /> Message Sent
              </>
            ) : (
              <>
                <Send className="mr-2" /> Send Message
              </>
            )}
          </motion.button>
        </motion.form>
        {submitStatus === 'success' && (
          <motion.p
            className="text-green-400 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thank you for your message. We&apos;ll get back to you soon!
          </motion.p>
        )}
        {submitStatus === 'error' && (
          <motion.p
            className="text-red-400 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            There was an error submitting your message. Please try again.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ContactForm;