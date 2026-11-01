import React from 'react';
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-20">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <HiOutlineLightningBolt className="text-3xl text-blue-500" />
            <span className="text-2xl font-bold text-white">Pakistan Sign Language </span>
          </div>
          
          <p className="text-gray-400 mb-8">
            Making sign language learning accessible to everyone through AI technology.
          </p>
          <div className="flex space-x-5">
            {[
              { icon: <FiTwitter />, href: "#" },
              { icon: <FiFacebook />, href: "#" },
              { icon: <FiInstagram />, href: "#" },
              { icon: <FiLinkedin />, href: "#" },
              { icon: <FiGithub />, href: "#" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors hover:-translate-y-1 hover:shadow-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6 hover:-translate-y-1 hover:shadow-lg">Product</h4>
          <ul className="space-y-4">
            {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6 hover:-translate-y-1 hover:shadow-lg">Resources</h4>
          <ul className="space-y-4">
            {['Blog', 'Tutorials', 'Community', 'Case Studies'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:-translate-y-1 hover:shadow-lg">{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-6 hover:-translate-y-1 hover:shadow-lg">Company</h4>
          <ul className="space-y-4">
            {['About', 'Careers', 'Contact', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <p>&copy; 2025 Pakistan Sign Language. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
