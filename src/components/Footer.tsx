'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const socialVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gray-800 dark:bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">About EMC</h3>
            <p className="text-gray-300">
              Empowering music creators through competitions, community, and opportunities.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/beat-battle', label: 'Beat Battle' },
                { href: '/merch', label: 'Merch' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaYoutube, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-gray-300 hover:text-white"
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-300"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <p>&copy; {new Date().getFullYear()} EMC. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 