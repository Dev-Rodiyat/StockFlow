import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Brand / Copyright */}
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-blue-600 font-semibold">Inventory Tracker</span>. All rights reserved.
        </p>

        {/* Optional: Social Icons */}
        <div className="mt-4 flex justify-center space-x-5 text-gray-500">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Optional: Footer Nav Links */}
        {/* <div className="mt-4 space-x-4 text-sm">
          <Link to="/about" className="text-gray-500 hover:text-blue-600 transition">About</Link>
          <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition">Contact</Link>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
