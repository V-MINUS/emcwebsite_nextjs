'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMusic, FaTrophy, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: FaMusic,
      title: 'Beat Battles',
      description: 'Compete in our monthly beat battles and showcase your talent to the world.',
      link: '/beat-battle'
    },
    {
      icon: FaTrophy,
      title: 'Competitions',
      description: 'Join our regular competitions and win amazing prizes.',
      link: '/beat-battle/current'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Connect with fellow music creators and industry professionals.',
      link: '/about'
    },
    {
      icon: FaCalendarAlt,
      title: 'Events',
      description: 'Stay updated with our upcoming events and workshops.',
      link: '/events'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Electronic Music Council
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Empowering music creators through competitions, community, and opportunities.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/beat-battle"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Join the Battle
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <feature.icon className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <Link
                  href={feature.link}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Don't miss out on our exciting events and competitions
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((event) => (
              <motion.div
                key={event}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Beat Battle #{event}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Join us for our monthly beat battle competition
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Coming Soon
                    </span>
                    <Link
                      href="/beat-battle"
                      className="text-blue-500 hover:text-blue-600 font-semibold"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 