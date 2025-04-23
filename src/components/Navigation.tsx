'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaMusic, FaTrophy, FaShoppingBag, FaEnvelope, FaUser, FaSun, FaMoon } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-gray-800 dark:bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <FaMusic className="h-8 w-8 text-blue-500 mr-2" />
              <span className="text-xl font-bold">EMC</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {[
                { href: '/', icon: FaHome, label: 'Home' },
                { href: '/beat-battle', icon: FaTrophy, label: 'Beat Battle' },
                { href: '/merch', icon: FaShoppingBag, label: 'Merch' },
                { href: '/contact', icon: FaEnvelope, label: 'Contact' },
                { href: '/admin/competitions', icon: FaUser, label: 'Admin' }
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href} 
                    className="hover:bg-gray-700 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <item.icon className="mr-2" /> {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { href: '/', icon: FaHome, label: 'Home' },
                { href: '/beat-battle', icon: FaTrophy, label: 'Beat Battle' },
                { href: '/merch', icon: FaShoppingBag, label: 'Merch' },
                { href: '/contact', icon: FaEnvelope, label: 'Contact' },
                { href: '/admin/competitions', icon: FaUser, label: 'Admin' }
              ].map((item) => (
                <motion.div
                  key={item.href}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    href={item.href} 
                    className="hover:bg-gray-700 dark:hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-2" /> {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation; 