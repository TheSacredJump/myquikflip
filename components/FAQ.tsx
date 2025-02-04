'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQItem = ({ question, answer }: {question: string, answer: string}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-700 py-4 px-5 rounded-lg"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(59, 130, 246, 0.1)" : "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-300"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: "What is QuikFlip?",
      answer: "QuikFlip is a cutting-edge platform that allows you customers to pay with crypto and businesses to receive in USD. Our service is designed to be fast, secure, and user-friendly, making it easy for you to access the value of your crypto assets in traditional currency."
    },
    {
      question: "Which cryptocurrencies does QuikFlip support?",
      answer: "QuikFlip supports a wide range of popular cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and many others. We're constantly expanding our list of supported currencies. Check our conversion page for the most up-to-date list of supported cryptocurrencies."
    },
    {
      question: "How long does a conversion take?",
      answer: "QuikFlip offers near-instant conversions. In most cases, your cryptocurrency will be converted to fiat currency within minutes. However, the exact time can vary depending on network congestion and the specific cryptocurrencies involved."
    },
    {
      question: "Is QuikFlip secure?",
      answer: "Yes, security is our top priority. We use bank-grade encryption and multi-factor authentication to protect your assets and personal information. Our platform is regularly audited by third-party security experts to ensure the highest levels of protection."
    },
    {
      question: "Can I use QuikFlip in my country?",
      answer: "QuikFlip is available in many countries worldwide. However, due to varying regulations, our service may be restricted in some regions. Please check our 'Supported Countries' page or contact our support team to confirm availability in your specific location."
    },
    {
      question: "Do I need to create an account to use QuikFlip?",
      answer: "No. If the business you are buying from is supported by QuikFlip, there is no need to create an account or sign up. However, if you are want our B2C solution, you will need to create an account to access our services."
    },
    {
      question: "What fiat currencies can I convert my crypto into?",
      answer: "QuikFlip supports conversion into major fiat currencies including USD, EUR, GBP, JPY, and many others. The exact list of supported fiat currencies may vary based on your location and current regulations."
    },
    {
      question: "How do I receive my converted fiat currency?",
      answer: "After conversion, you can withdraw your fiat currency to your linked bank account. We also offer options for direct deposits to certain digital wallets or prepaid cards, depending on your location and preferences."
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="faq" className="bg-gray-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-10 w-[95%] mx-auto">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>
        
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredFAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>

        {filteredFAQs.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No matching questions found. Please try a different search term.</p>
        )}

        
      </div>
    </div>
  );
};

export default FAQ;