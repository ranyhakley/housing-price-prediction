
"use client";  // Enables client-side rendering in a Next.js app

import HeroSection from '@/components/sections/HeroSection';
import ProductFeature from '@/components/sections/ProductFeature';
import AboutUs from '@/components/sections/AboutUs';
import { Testimonials } from '@/components/sections/Testimonials';

const Home = () => {
  return (
    <div className="mx-auto p-4">
      <main className="pt-16"> {/* Add padding to avoid overlap with the fixed header */}
        <HeroSection />
        <ProductFeature />
        <Testimonials />
        <AboutUs />
      </main>
    </div>
  );
};

export default Home;
