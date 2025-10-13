import { Footer } from "nextra-theme-docs";
import React from "react";

const footer = (
    <Footer className="mx-auto border border-gray-200/50 bg-white/80 px-4 py-16 text-center text-gray-600 backdrop-blur-sm md:px-8 dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-gray-400">
        <p className="mb-6">&copy; 2023 Aura Al-Qur`an API. Built for the Muslim developer community.</p>
        <div className="flex justify-center space-x-8">
            <a href="/privacy" className="transition-colors hover:text-gray-900 dark:hover:text-gray-200">
                Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-gray-900 dark:hover:text-gray-200">
                Terms of Service
            </a>
            <a href="/contact" className="transition-colors hover:text-gray-900 dark:hover:text-gray-200">
                Contact
            </a>
        </div>
    </Footer>
);

export default footer;
