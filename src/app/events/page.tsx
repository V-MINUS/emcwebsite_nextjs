'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaClock } from 'react-icons/fa';

const Events = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const events = {
    upcoming: [
      {
        id: 1,
        title: 'Beat Battle #5',
        date: '2024-03-15',
        time: '19:00',
        location: 'Cork City',
        description: 'Join us for our monthly beat battle competition',
        tickets: 'Free Entry'
      },
      {
        id: 2,
        title: 'Producer Workshop',
        date: '2024-03-22',
        time: '18:00',
        location: 'Cork City',
        description: 'Learn advanced production techniques from industry professionals',
        tickets: '€20'
      },
      {
        id: 3,
        title: 'EMC Showcase',
        date: '2024-04-05',
        time: '20:00',
        location: 'Cork City',
        description: 'Showcase of winning tracks from recent competitions',
        tickets: '€15'
      }
    ],
    past: [
      {
        id: 4,
        title: 'Beat Battle #4',
        date: '2024-02-15',
        time: '19:00',
        location: 'Cork City',
        description: 'Previous beat battle competition',
        tickets: 'Completed'
      },
      {
        id: 5,
        title: 'Sound Design Masterclass',
        date: '2024-01-25',
        time: '18:00',
        location: 'Cork City',
        description: 'Advanced sound design techniques workshop',
        tickets: 'Completed'
      }
    ]
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Events</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Join us for exciting competitions, workshops, and showcases
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'past'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events[activeTab].map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaClock className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaTicketAlt className="mr-2" />
                      <span>{event.tickets}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                  {activeTab === 'upcoming' && (
                    <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                      Get Tickets
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events; 