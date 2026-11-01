import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Image } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (isMenuOpen && e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Add overflow hidden to body when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`${
          scrolled ? "bg-white/90" : "bg-white/80"
        } backdrop-blur-md shadow-sm fixed w-full z-50 transition-all duration-300`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo Image - using placeholder for lucide icon since logo.png may not exist */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="logo" className="w-8 h-8" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Pakistan Sign Language
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLinks />
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden focus:outline-none menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          <div className="py-6 px-5 flex flex-col space-y-6 flex-grow">
            <div className="flex flex-col space-y-6">
              <MobileNavLinks setIsMenuOpen={setIsMenuOpen} />
            </div>

            <div className="mt-auto border-t pt-6">
              <MobileAuthButtons setIsMenuOpen={setIsMenuOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Navigation Links Component
const NavLinks = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/recognition", label: "Recognition" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="text-gray-700 hover:text-blue-600 transition-colors relative group py-1"
        >
          {link.label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </>
  );
};

// Mobile Navigation Links
const MobileNavLinks = ({ setIsMenuOpen }) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/recognition", label: "Recognition" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
   
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

// Authentication Buttons Component
const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="border-2 border-gray-300 text-gray-700 px-3 py-1 rounded-full hover:border-blue-600 hover:text-blue-600 transition duration-300 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center cursor-pointer hover:-translate-y-1 hover:shadow-lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </SignUpButton>
      </SignedOut>
    </>
  );
};

// Mobile Authentication Buttons
const MobileAuthButtons = ({ setIsMenuOpen }) => {
  return (
    <div className="flex flex-col space-y-4">
      <SignedIn>
        <div className="flex items-center space-x-3 mb-4">
          <UserButton afterSignOutUrl="/" />
          <span className="text-gray-700">Your Account</span>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="w-full text-gray-700 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex justify-center items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
};

export default Navbar;
