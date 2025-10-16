"use client";

import { ChevronDown, Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: any) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => setIsSubscribed(false), 3000);
            setEmail("");
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black pt-16 pb-8 text-white">
            <div className="container mx-auto px-6">
                {/* Subscription Section - Disesuaikan untuk API */}
                <div className="mb-16 text-center">
                    <h3 className="mb-4 text-2xl font-semibold">Get API Updates</h3>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-400">
                        Be the first to know about new endpoints, feature updates, and important deprecations.
                    </p>
                    <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col items-center justify-center sm:flex-row">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mb-2 w-full rounded-t-lg bg-gray-800 px-4 py-3 focus:ring-2 focus:ring-purple-600 focus:outline-none sm:mb-0 sm:flex-1 sm:rounded-l-lg sm:rounded-tr-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full rounded-b-lg bg-purple-600 px-6 py-3 font-medium transition-colors duration-200 hover:bg-purple-700 sm:w-auto sm:rounded-r-lg sm:rounded-bl-none"
                        >
                            Subscribe
                        </button>
                    </form>
                    {isSubscribed && <p className="mt-4 text-green-400">Thank you for subscribing!</p>}
                </div>

                {/* Navigation Columns - Disesuaikan untuk API */}
                <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Product Column -> API Product */}
                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            API Product
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Endpoints
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column -> Developer Support */}
                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            Support
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Getting Started
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Developer Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    API Status
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column -> Developer Resources */}
                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            Resources
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    SDKs & Libraries
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Community
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* About Column */}
                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            Company
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Press Kit
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Partners
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Ikon sosial media disesuaikan */}
                <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400">© 2024 YourAPI. All rights reserved.</p>
                    </div>

                    <div className="flex space-x-6">
                        {/* GitHub diprioritaskan untuk developer */}
                        <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Community Forum">
                            <MessageSquare className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="Twitter">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors hover:text-white" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
