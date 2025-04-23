'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
};

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'EMC Launches New Artist Development Program',
    excerpt: 'We\'re excited to announce our new artist development program, designed to support emerging electronic music producers in Cork.',
    date: '2024-04-15',
    image: '/images/news/artist-program.jpg',
    category: 'Announcements'
  },
  {
    id: '2',
    title: 'Upcoming Workshop: Music Production Basics',
    excerpt: 'Join us for a beginner-friendly workshop on music production fundamentals, perfect for those starting their electronic music journey.',
    date: '2024-04-20',
    image: '/images/news/workshop.jpg',
    category: 'Events'
  },
  {
    id: '3',
    title: 'Community Spotlight: Local Producer Makes Waves',
    excerpt: 'We shine a light on one of our community members who has been making significant strides in the electronic music scene.',
    date: '2024-04-10',
    image: '/images/news/spotlight.jpg',
    category: 'Community'
  }
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest News</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <article key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-500">{item.category}</span>
                <span className="text-sm text-gray-400">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.excerpt}</p>
              <Link
                href={`/news/${item.id}`}
                className="text-blue-500 hover:text-blue-400"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 