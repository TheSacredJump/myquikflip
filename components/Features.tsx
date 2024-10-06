"use client";

import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";
import Spline from "@splinetool/react-spline";

export function QuikFlipFeaturesCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div id='features' className="w-full h-full py-20 bg-gray-950">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
        Discover QuikFlip's Features
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const FeatureContent = ({ title, description, splineScene }: any) => {
    return (
      <div className="bg-[#2A2A2A] p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-300 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-white">{title}</span>{" "}
          {description}
        </p>
        <div className="w-full h-[300px] md:h-[500px] mt-8">
          <Spline scene={splineScene} />
        </div>
      </div>
    );
  };

  const data = [
    {
      category: "Instant Conversion",
      title: "Convert Crypto to Fiat in Seconds",
      src: "https://prod.spline.design/9RHTTHtntQrUmjdu/scene.splinecode", // Use your Spline scene URL here
      content: (
        <FeatureContent
          title="Lightning-Fast Transactions"
          description="Experience the power of QuikFlip's instant conversion. Turn your crypto into spendable cash with just a few taps, making everyday purchases a breeze."
          splineScene="https://prod.spline.design/9RHTTHtntQrUmjdu/scene.splinecode" // Use your Spline scene URL here
        />
      ),
    },
  {
    category: "Multiple Currencies",
    title: "Support for Major Cryptocurrencies",
    src: "https://prod.spline.design/5dChaHNC0IF2STGj/scene.splinecode",
    content: (
      <FeatureContent
        title="Diverse Crypto Portfolio"
        description="QuikFlip supports a wide range of cryptocurrencies, including Bitcoin, Ethereum, and more. Manage and convert multiple digital assets in one place."
        splineScene="https://prod.spline.design/5dChaHNC0IF2STGj/scene.splinecode"
      />
    ),
  },
  {
    category: "Security",
    title: "Bank-Grade Security for Your Assets",
    src: "https://prod.spline.design/5rIxZWqIatwHAvak/scene.splinecode",
    content: (
      <FeatureContent
        title="Your Security is Our Priority"
        description="Rest easy knowing your assets are protected by state-of-the-art encryption and multi-factor authentication. QuikFlip employs the latest security measures to keep your investments safe."
        splineScene="https://prod.spline.design/5rIxZWqIatwHAvak/scene.splinecode"
      />
    ),
  },
  {
    category: "Low Fees",
    title: "Competitive Rates and Low Fees",
    src: "https://prod.spline.design/2bmt3o7zZI47WyqA/scene.splinecode",
    content: (
      <FeatureContent
        title="More Value for Your Crypto"
        description="Enjoy some of the lowest fees in the industry. QuikFlip's transparent pricing ensures you get the most out of your conversions, with no hidden charges."
        splineScene="https://prod.spline.design/2bmt3o7zZI47WyqA/scene.splinecode"
      />
    ),
  },
  {
    category: "User-Friendly",
    title: "Intuitive Interface for All Users",
    src: "https://prod.spline.design/Nzy0mCIkimZIs4hA/scene.splinecode",
    content: (
      <FeatureContent
        title="Simplicity Meets Functionality"
        description="Whether you're a crypto novice or an experienced trader, QuikFlip's user-friendly interface makes converting and managing your assets a seamless experience."
        splineScene="https://prod.spline.design/Nzy0mCIkimZIs4hA/scene.splinecode"
      />
    ),
  },
  {
    category: "24/7 Support",
    title: "Round-the-Clock Customer Service",
    src: "https://prod.spline.design/SZkOc6pEa02HapmL/scene.splinecode",
    content: (
      <FeatureContent
        title="We're Here When You Need Us"
        description="Our dedicated support team is available 24/7 to assist you with any questions or concerns. Experience peace of mind with QuikFlip's reliable customer service."
        splineScene="https://prod.spline.design/SZkOc6pEa02HapmL/scene.splinecode"
      />
    ),
  },
];

export default QuikFlipFeaturesCarousel;