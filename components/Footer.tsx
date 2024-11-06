import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import icons from react-icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005a70] text-white py-8">
      {/* Main Container */}
      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center">
        {/* Contact Information */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: housingbubble@gmail.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          <p className="text-sm">Address: 123 Street, City, Country</p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook
              className="text-white hover:text-gray-300 transition-colors"
              size={28}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter
              className="text-white hover:text-gray-300 transition-colors"
              size={28}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram
              className="text-white hover:text-gray-300 transition-colors"
              size={28}
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin
              className="text-white hover:text-gray-300 transition-colors"
              size={28}
            />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center border-t border-gray-500 pt-4">
        <p className="text-sm">
          © {new Date().getFullYear()} HousingBubbles. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
