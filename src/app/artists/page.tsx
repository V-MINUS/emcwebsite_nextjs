'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type Artist = {
  id: string;
  name: string;
  bio: string;
  image_url: string;
  soundcloud_url: string;
  spotify_url: string;
  instagram_url: string;
};

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArtists(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Featured Artists</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={artist.image_url}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{artist.name}</h2>
              <p className="text-gray-300 mb-4">{artist.bio}</p>
              <div className="flex space-x-4">
                {artist.soundcloud_url && (
                  <a
                    href={artist.soundcloud_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    SoundCloud
                  </a>
                )}
                {artist.spotify_url && (
                  <a
                    href={artist.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300"
                  >
                    Spotify
                  </a>
                )}
                {artist.instagram_url && (
                  <a
                    href={artist.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 