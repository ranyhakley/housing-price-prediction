"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation"; // Use the App Router's useRouter

const AboutUs: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-50 bg-gray-50 py-16">
      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between">
        {/* Text Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="md:w-1/2 md:pr-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Us
          </h2>
          <p className="text-lg mb-6">
            We are young Australians passionate about tackling the housing
            crisis. Our mission is to provide innovative solutions and make
            housing more accessible for everyone.
          </p>
          <p className="text-lg">
            With a deep understanding of the challenges facing the housing
            market, we aim to empower people through technology, data, and
            community-driven initiatives.
          </p>
          <button
          className="mt-6 px-8 py-3 text-md font-semibold text-[#005a70] border-[#005a70] bg-white rounded-full hover:bg-[#003e4e] transition-colors"
          onClick={() => router.push("/about")} // Navigate to /product on click
          >
            Learn more about us
          </button>
        </motion.div>

        {/* Image Section */}
        <div className="flex space-x-4 mt-8 md:mt-0">
          <motion.img
            src="/teamwork.png"
            alt="Team working together"
            className="w-3/4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
