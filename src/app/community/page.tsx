'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord, FaInstagram, FaFacebook, FaSoundcloud } from 'react-icons/fa';

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Join Our Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-gray-300 mb-6">
            Join our growing community of electronic music enthusiasts, artists, and producers. Connect with like-minded individuals, share your work, and stay updated with the latest events and opportunities.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://discord.gg/emc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaDiscord className="text-3xl" />
            </a>
            <a
              href="https://instagram.com/emc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram className="text-3xl" />
            </a>
            <a
              href="https://facebook.com/emc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebook className="text-3xl" />
            </a>
            <a
              href="https://soundcloud.com/emc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaSoundcloud className="text-3xl" />
            </a>
          </div>
        </div>
        <div className="relative h-64 md:h-auto">
          <Image
            src="/images/community.jpg"
            alt="EMC Community"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Events & Workshops</h3>
          <p className="text-gray-300 mb-4">
            Join our regular events and workshops to learn new skills, meet other artists, and showcase your work.
          </p>
          <Link
            href="/events"
            className="text-blue-500 hover:text-blue-400"
          >
            View Events →
          </Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Artist Support</h3>
          <p className="text-gray-300 mb-4">
            Get support for your music career, from production tips to performance opportunities and networking.
          </p>
          <Link
            href="/artists"
            className="text-blue-500 hover:text-blue-400"
          >
            Learn More →
          </Link>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Collaborate</h3>
          <p className="text-gray-300 mb-4">
            Find collaborators for your projects, join forces with other artists, and create something amazing together.
          </p>
          <Link
            href="/contact"
            className="text-blue-500 hover:text-blue-400"
          >
            Get in Touch →
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Join Our Newsletter</h2>
        <p className="text-gray-300 mb-6">
          Stay updated with the latest news, events, and opportunities in the Cork electronic music scene.
        </p>
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
} 