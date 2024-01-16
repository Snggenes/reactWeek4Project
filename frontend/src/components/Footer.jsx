import React from "react";
import { FaHeart, FaEnvelope, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-8 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4 md:mb-0">
          <p className="text-lg font-bold text-red-400">FrowOwner</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <FaInfoCircle className="text-lg mr-2" />
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-lg mr-2" />
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>
          <p>© 2024 FrowOwner. Made with <FaHeart className="text-red-500" /> by Your Team</p>
          <a
            href="https://github.com/Snggenes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
