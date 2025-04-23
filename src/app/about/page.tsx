'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaTrophy, FaHandshake } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaUsers,
      title: 'Community',
      description: 'Building a strong, supportive community of music creators.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Encouraging creativity and pushing boundaries in electronic music.'
    },
    {
      icon: FaTrophy,
      title: 'Excellence',
      description: 'Striving for excellence in all our competitions and events.'
    },
    {
      icon: FaHandshake,
      title: 'Collaboration',
      description: 'Fostering collaboration between artists and industry professionals.'
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
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About EMC</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering the electronic music community through competitions, education, and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To create a sustainable electronic music economy by facilitating opportunities for growth and development in Cork's music scene.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <value.icon className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the passionate individuals behind EMC
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((member) => (
              <motion.div
                key={member}
                variants={itemVariants}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-center mb-2">
                    Team Member {member}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    Role Description
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 