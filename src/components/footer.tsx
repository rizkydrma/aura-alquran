import { Footer } from "nextra-theme-docs";
import React from "react";

const footer = (
  <Footer className="py-16 px-4 md:px-8 text-center text-gray-600 dark:text-gray-400 mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
    <p className="mb-6">&copy; 2023 Aura Al-Qur`an API. Built for the Muslim developer community.</p>
    <div className="flex justify-center space-x-8">
      <a href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
        Privacy Policy
      </a>
      <a href="/terms" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
        Terms of Service
      </a>
      <a href="/contact" className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
        Contact
      </a>
    </div>
  </Footer>
);

export default footer;
