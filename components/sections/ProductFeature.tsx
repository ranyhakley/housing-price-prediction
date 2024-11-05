import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from "next/navigation";


const ProductFeature: React.FC = () => {
  const controls = useAnimation();
  const router = useRouter(); // Initialize the router
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div
      ref={ref}
      className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between bg-gray-50 min-h-[75vh] py-16"
    >
      <motion.div
        className="w-full md:w-1/2 mb-8 md:mb-0"
        initial="hidden"
        animate={controls}
        variants={textVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Amazing Product
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Discover the features and benefits of our product. It is designed to
          provide exceptional performance and user experience.
        </p>
        <p className="text-lg text-gray-600">
          From seamless integration to top-notch support, our product offers
          everything you need to either buy, sell, rent, or invest.
        </p>
        <button
        className="mt-6 px-8 py-3 text-md font-semibold text-[#005a70] border-[#005a70] bg-white rounded-full hover:bg-[#003e4e] transition-colors"
        onClick={() => router.push("/about")} // Navigate to /product on click
        >
          Find out more
        </button>
        
      </motion.div>

      <motion.div
        className="w-full md:w-1/2"
        initial="hidden"
        animate={controls}
        variants={imageVariants}
      >
        <img
          src="/path/to/your/image.jpg"
          alt="Product Example"
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default ProductFeature;
