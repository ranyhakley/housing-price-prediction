
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: "This AI tool has completely transformed how I evaluate real estate investments. The accuracy of the house price predictions is impressive.",
    imageSrc: avatar1.src,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Thanks to this platform, I was able to make a well-informed decision when buying my first home. Highly recommend it to anyone in the market!",
    imageSrc: avatar2.src,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "The predictions provided by this AI model have saved me countless hours of market research. It’s a must-have tool for real estate professionals.",
    imageSrc: avatar3.src,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how well the AI model understood market trends. It gave me confidence in my property investment decisions.",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "This platform's ability to analyze historical data and predict future prices is unmatched. It’s like having a personal real estate analyst.",
    imageSrc: avatar5.src,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "Using this AI tool has made my real estate consulting more data-driven and accurate. My clients love the insights I can now provide.",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "The user-friendly interface and detailed insights make this AI tool essential for anyone involved in real estate.",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "I've used other tools before, but none compare to the precision and ease of use of this AI-powered house price prediction platform.",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "This platform helped me identify the right time to sell my property, and the prediction was spot on. Absolutely game-changing!",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {className?: string; testimonials: typeof testimonials; duration?: number;}) => (
  <div className="props.className">
    <motion.div 
    className="flex flex-col gap-6 pb-6"
    animate={{
      translateY: "-50%",
    }}
    transition={{
      duration: props.duration || 10,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
    }}
    >
      {[...new Array(2)].fill(0).map((_, index)=>(
        <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username}, idx) =>(
              <div className="card" key={idx}>
                <div>
                  {text}
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <Image 
                  src={imageSrc} 
                  alt={name} 
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"/>
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight">
                      {username}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
)


export const Testimonials = () => {
  return (
    <div className="container mx-auto px-8 md:px-16 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-4 mb-2">What our users say</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 overflow-hidden max-h-[738px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
        <TestimonialsColumn testimonials={firstColumn} duration={12} className="block md:hidden" />
        <TestimonialsColumn testimonials={secondColumn} duration={15} className="hidden md:block" />
        <TestimonialsColumn testimonials={thirdColumn} duration={18} className="hidden lg:block" />
      </div>
    </div>
  );
};
