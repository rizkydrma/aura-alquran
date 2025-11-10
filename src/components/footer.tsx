"use client";

import { ChevronDown } from "lucide-react";
import Logo from "./logo";

const Footer = () => {
    return (
        <footer className="border-t bg-neutral-900 pt-16 pb-8 text-white">
            <div className="container mx-auto px-6">
                <div className="mb-12 grid grid-cols-2 items-start gap-8 md:grid-cols-4">
                    <div className="col-span-2">
                        <Logo />
                    </div>
                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            Product
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    API Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Read Al Qur`an
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Doa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Dzikir
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Hadits
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 flex items-center text-lg font-semibold">
                            Legal
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t pt-8 md:flex-row">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400">© 2025 NinetynineXLabs.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
