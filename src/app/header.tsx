"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Updated the ref type to match the div containing the dropdown.

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-2xl">
                    Pages for App Router
                </div>
                <nav className="space-x-4">
                    <a href="/" className="text-white hover:text-blue-300">Home</a>

                    <div className="relative inline-block text-white" ref={dropdownRef}>
                        <button className="text-white hover:text-blue-300" onClick={toggleDropdown}>
                            Services
                        </button>
                        {isOpen && (
                            <div className="absolute mt-2 space-y-0 bg-blue-500 text-white border rounded">
                                <Link href="/services/product" className="block px-4 py-2">Product</Link>
                                <Link href="/services/category" className="block px-4 py-2">Category</Link>
                            </div>
                        )}
                    </div>

                    <a href="/contact" className="text-white hover:text-blue-300">Contact</a>
                    <a href="/about" className="text-white hover:text-blue-300">About</a>
                </nav>
            </div>
        </header>
    );
}
