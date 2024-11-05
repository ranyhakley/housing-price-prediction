"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Use the App Router's useRouter
import { FaArrowLeft } from "react-icons/fa"; // Import an arrow icon from react-icons


const AboutPage: React.FC = () => {
    const router = useRouter(); // Use the correct useRouter from next/navigation

    return (
        <>
            <div className="container mx-auto mt-8 p-8 flex flex-col min-h-[93vh]">
                <div
                    className="flex items-center mb-4 mt-8 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <FaArrowLeft className="text-[#005a70] mr-2" size={20} />
                    <span className="text-[#005a70] font-medium">Go Back</span>
                </div>

                {/* Introduction Section */}
                <section className="mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-[#005a70]">About Our Website</h1>
                    <p className="text-lg text-[#121212]">
                        Welcome to our Full Stack House Price Prediction Website! Our goal is to
                        provide accurate and insightful predictions of house prices using cutting-edge
                        machine learning technology. We aim to make real estate market analysis
                        accessible and easy to understand for everyone, from first-time buyers to
                        seasoned investors.
                    </p>
                </section>

                {/* Technology Used Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-4 text-[#005a70]">Technology Stack</h2>
                    <p className="text-lg text-[#121212] mb-4">
                        Our website is built using a modern and efficient technology stack to ensure
                        optimal performance and a seamless user experience.
                    </p>
                    <ul className="list-disc list-inside text-lg text-[#121212]">
                        <li>
                            <strong>Framework:</strong> Next.js 13 (App Router) for server-side rendering and
                            static site generation.
                        </li>
                        <li>
                            <strong>Libraries:</strong>
                            <ul className="list-none ml-6">
                                <li>- Tailwind CSS for styling and responsive design.</li>
                                <li>- Framer Motion for smooth animations and transitions.</li>
                                <li>- React Icons for scalable SVG icons.</li>
                                <li>- D3.js for advanced and interactive data visualizations.</li>
                                <li>- Resend for email functionality and sending notifications.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Backend:</strong> FastAPI for handling API requests and integrating the AI model.
                        </li>
                        <li>
                            <strong>Machine Learning:</strong> Scikit-Learn for training and predicting house prices using AI models.
                        </li>
                    </ul>
                </section>

                {/* Team Members Section */}
                <section>
                    <h2 className="text-3xl font-semibold mb-4 text-[#005a70]">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#005a70] mb-2">Rany Hakley Hong</h3>
                            <p className="text-sm text-[#121212]">
                                John is a passionate developer with expertise in Next.js and FastAPI. He loves
                                building scalable and efficient web applications.
                            </p>
                            <img></img>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#005a70] mb-2">Ethan Hair</h3>
                            <p className="text-sm text-[#121212]">
                                Jane is responsible for designing and training the AI models using Scikit-Learn.
                                Her expertise in data science and machine learning drives our accurate predictions.
                            </p>
                            <img></img>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-[#005a70] mb-2">Harry Catlin</h3>
                            <p className="text-sm text-[#121212]">
                                Michael ensures our platform is intuitive and user-friendly. His designs are
                                focused on providing the best user experience possible.
                            </p>
                            <img></img>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
