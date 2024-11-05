"use client";

import { useRouter } from "next/navigation"; // Use the App Router's useRouter
import { FaArrowLeft } from "react-icons/fa"; // Import an arrow icon from react-icons
import { sendEmail } from "@/email/sendEmail";
import toast from "react-hot-toast";
import { useRef } from "react";


const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter(); // Use the correct useRouter from next/navigation
  
  return (
    <>
      <div className="flex flex-col min-h-[93vh]"> {/* Use flexbox and min-h-screen */}
        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4 mt-8"> {/* flex-grow to fill space */}
          {/* "Go Back" Navigation */}
          <div
            className="flex items-center mb-4 mt-8 cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft className="text-[#005a70] mr-2" size={20} />
            <span className="text-[#005a70] font-medium">Go Back</span>
          </div>

          {/* Contact Form Section */}
          <section
            id="contact"
            className="max-w-3xl mx-auto mb-16 md:mb-24 lg:mb-36 px-6 py-8 bg-white rounded-lg shadow-lg mt-10"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#005a70]">Contact Us</h2>
              <p className="text-neutral-500 mt-2">
                Feel free to reach out directly at{" "}
                <a
                  href="mailto:ranyhakleyh@gmail.com"
                  className="underline text-[#005a70] hover:text-[#003e4e] transition-colors"
                >
                  ranyhakleyh@gmail.com
                </a>{" "}
                or use the form below.
              </p>
            </div>

            {/* Contact Form */}
            <form
              ref={formRef}
              className="flex flex-col space-y-6"
              action={async (formData) => {
                const { error } = await sendEmail(formData);

                if (error) {
                  toast.error(error);
                  return;
                }
                toast.success("Email sent successfully!");

                if (formRef.current) {
                  formRef.current.reset();
                }
              }}
            >
              {/* Email Input */}
              <input
                type="email"
                name="senderEmail"
                className="h-12 rounded-md border border-gray-300 px-4 text-gray-900 outline-none focus:border-[#005a70] focus:ring-2 focus:ring-[#005a70] transition"
                placeholder="Your email"
                required
                maxLength={100}
              />

              {/* Message Textarea */}
              <textarea
                name="message"
                className="h-40 rounded-md border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-[#005a70] focus:ring-2 focus:ring-[#005a70] transition resize-none"
                placeholder="Your message"
                required
                maxLength={1000}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="h-12 rounded-md bg-[#005a70] text-white font-bold hover:bg-[#003e4e] transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#005a70] focus:ring-offset-2"
              >
                Send
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default ContactPage;
