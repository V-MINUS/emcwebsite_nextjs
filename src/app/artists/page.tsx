'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaSoundcloud, FaInstagram, FaSpotify } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Artists | Electronic Music Council',
  description: 'Featured artists and DJs supported by the Electronic Music Council.',
};

type Artist = {
  id: number;
  name: string;
  genre: string;
  bio: string;
  image: string;
  socialLinks: {
    soundcloud?: string;
    instagram?: string;
    spotify?: string;
  };
};

const featuredArtists: Artist[] = [
  {
    id: 1,
    name: "DJ Static",
    genre: "Techno",
    bio: "Cork-based techno DJ with a focus on hard-hitting industrial sounds.",
    image: "/images/team-placeholder.jpg",
    socialLinks: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      spotify: "https://spotify.com"
    }
  },
  {
    id: 2,
    name: "Small Crab",
    genre: "Ambient / Experimental",
    bio: "Electronic music producer creating otherworldly soundscapes and experimental beats.",
    image: "/images/team-placeholder.jpg",
    socialLinks: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: 3,
    name: "Pulse Collective",
    genre: "House / Disco",
    bio: "A duo bringing uplifting house and disco vibes to dance floors across Ireland.",
    image: "/images/team-placeholder.jpg",
    socialLinks: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com",
      spotify: "https://spotify.com"
    }
  }
];

const residents: Artist[] = [
  {
    id: 4,
    name: "Synthia",
    genre: "Synth Wave",
    bio: "EMC resident specializing in nostalgic 80s-inspired synth wave and retro beats.",
    image: "/images/team-placeholder.jpg",
    socialLinks: {
      soundcloud: "https://soundcloud.com"
    }
  },
  {
    id: 5,
    name: "Bass Theory",
    genre: "Bass Music / Breaks",
    bio: "Pushing the boundaries of bass music with innovative break beats and deep sub frequencies.",
    image: "/images/team-placeholder.jpg",
    socialLinks: {
      soundcloud: "https://soundcloud.com",
      instagram: "https://instagram.com"
    }
  }
];

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1">{artist.name}</h3>
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-400 mb-4">
          {artist.genre}
        </span>
        <p className="text-zinc-300 mb-6">{artist.bio}</p>
        <div className="flex items-center gap-4 mb-6">
          {artist.socialLinks.soundcloud && (
            <a 
              href={artist.socialLinks.soundcloud} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-orange-500 transition-colors"
              title="SoundCloud"
            >
              <FaSoundcloud className="w-6 h-6" />
            </a>
          )}
          {artist.socialLinks.instagram && (
            <a 
              href={artist.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-pink-500 transition-colors"
              title="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          )}
          {artist.socialLinks.spotify && (
            <a 
              href={artist.socialLinks.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-green-500 transition-colors"
              title="Spotify"
            >
              <FaSpotify className="w-6 h-6" />
            </a>
          )}
        </div>
        <Link 
          href={`/artists/${artist.id}`}
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default function Artists() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-purple-900/50 to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artists</h1>
          <div className="w-24 h-1 bg-purple-600"></div>
        </div>
      </section>
      
      {/* Featured Artists */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Artists</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Resident DJs */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">EMC Residents</h2>
            <div className="w-24 h-1 bg-purple-600"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {residents.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Artist Signup */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Artist Network</h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            We're always looking for new talent to join our community. Whether you're a DJ, producer, 
            or live performer, we'd love to hear from you.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
} 