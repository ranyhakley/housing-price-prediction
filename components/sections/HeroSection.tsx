"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";

const textArray = ['invest?', 'buy?', 'rent?', 'sell?'];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const router = useRouter(); // Initialize the router

  // Rotate text every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f1fcff] to-white text-white text-center">
      <h1 className="text-[#121212] text-4xl md:text-5xl font-bold mb-4 inline-flex gap-3">
        <p className='relative right-20'>
            Looking to{' '}
        </p>
        <span className="inline-flex relative right-20">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 text-[#005a70] top-0"
            >
              {textArray[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
      <h2>
        With our new AI technology, you can get the most accurate predicted price.
        </h2>
      <button
        className="mt-6 px-8 py-3 text-2xl font-semibold text-[#005a70] border-[#005a70] bg-white rounded-full hover:bg-[#003e4e] transition-colors"
        onClick={() => router.push("/product")} // Navigate to /product on click
        >
        Predict Now
      </button>
    </div>
  );
};

export default HeroSection;
