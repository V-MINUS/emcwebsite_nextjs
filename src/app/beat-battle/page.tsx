'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FaArrowRight, FaSoundcloud } from 'react-icons/fa';

type Winner = {
  id: string;
  artist_name: string;
  track_title: string;
  soundcloud_url: string;
  spotify_url?: string;
  votes: number;
  created_at: string;
};

export default function BeatBattle() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('status', 'winner')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWinners(data || []);
    } catch (err) {
      setError('Failed to load winners');
      console.error('Error fetching winners:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Beat Battle</h1>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Competition</h2>
        <p className="text-gray-300 mb-4">
          Submit your tracks and vote for your favorites in our current beat battle competition.
        </p>
        <Link
          href="/beat-battle/current"
          className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          View Current Competition
          <FaArrowRight className="ml-2" />
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Past Winners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner) => (
            <div key={winner.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{winner.track_title}</h3>
              <p className="text-gray-400 mb-4">by {winner.artist_name}</p>
              
              <div className="mb-4">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(winner.soundcloud_url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                />
              </div>

              {winner.spotify_url && (
                <a
                  href={winner.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-500 hover:text-green-400"
                >
                  <FaSoundcloud className="mr-2" />
                  Listen on Spotify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Submit Your Track</h3>
            <p className="text-gray-300">
              Upload your track to SoundCloud and submit it through our form.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">2. Voting Period</h3>
            <p className="text-gray-300">
              The community has 5 days to listen and vote for their favorite tracks.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">3. Winner Announcement</h3>
            <p className="text-gray-300">
              The track with the most votes wins and gets featured in our winners carousel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 