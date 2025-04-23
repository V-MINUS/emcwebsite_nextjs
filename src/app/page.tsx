'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMusic, FaTrophy, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
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
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.svg"
            alt="Electronic Music Council"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Electronic Music Council
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
            Fostering Cork's electronic music culture through events, education, and community initiatives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
            >
              Upcoming Events
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 bg-transparent border-2 border-purple-600 hover:bg-purple-600/20 text-white rounded-lg font-semibold transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-zinc-300 mb-8">
              A community working to generate and maintain a positive, sustainable electronic music economy by facilitating opportunities for growth and development in Cork.
            </p>
            <Link 
              href="/about" 
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-zinc-800 rounded-lg overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/event-placeholder.svg"
                  alt="EMC Presents: Small Crab at Liquid Lounge"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center bg-purple-600 px-4 py-2 rounded">
                    <span className="block text-2xl font-bold">15</span>
                    <span className="text-sm">APR</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">EMC Presents: Small Crab at Liquid Lounge</h3>
                    <p className="text-zinc-400">Liquid Lounge, Cork</p>
                    <p className="text-zinc-400">10:00 PM - 2:00 AM</p>
                  </div>
                </div>
                <p className="text-zinc-300 mb-4">
                  Join us for an unforgettable night featuring Small Crab, delivering cutting-edge electronic sounds in an intimate venue setting.
                </p>
                <Link 
                  href="/events" 
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition duration-300"
                >
                  Get Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Be part of Cork's growing electronic music scene. Connect with artists, attend workshops, and participate in our events.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </main>
  );
} 