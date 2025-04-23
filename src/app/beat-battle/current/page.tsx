'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import EntryCard from '@/components/EntryCard';
import { FaClock } from 'react-icons/fa';

interface Entry {
  id: string;
  artist_name: string;
  track_title: string;
  soundcloud_url: string;
  spotify_url?: string;
  votes: number;
}

interface Competition {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
}

export default function CurrentCompetition() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votedEntries, setVotedEntries] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    fetchEntries();
    fetchCompetition();
    loadVotedEntries();
  }, []);

  useEffect(() => {
    if (competition?.end_date) {
      const timer = setInterval(() => {
        updateTimeRemaining();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [competition]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('status', 'active')
        .order('votes', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError('Failed to load entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompetition = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('status', 'active')
        .single();

      if (error) throw error;
      setCompetition(data);
    } catch (err) {
      setError('Failed to load competition');
      console.error(err);
    }
  };

  const loadVotedEntries = () => {
    const voted = localStorage.getItem('votedEntries');
    if (voted) {
      setVotedEntries(JSON.parse(voted));
    }
  };

  const updateTimeRemaining = () => {
    if (!competition?.end_date) return;

    const endDate = new Date(competition.end_date);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining('Voting has ended');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  const handleVote = async (entryId: string) => {
    if (votedEntries.includes(entryId)) return;

    try {
      // Insert vote
      const { error: voteError } = await supabase
        .from('votes')
        .insert([{ entry_id: entryId }]);

      if (voteError) throw voteError;

      // Update entry vote count
      const { error: updateError } = await supabase
        .from('entries')
        .update({ votes: entries.find(e => e.id === entryId)?.votes + 1 })
        .eq('id', entryId);

      if (updateError) throw updateError;

      // Update local state
      setEntries(entries.map(entry =>
        entry.id === entryId ? { ...entry, votes: entry.votes + 1 } : entry
      ));

      // Update voted entries
      const newVotedEntries = [...votedEntries, entryId];
      setVotedEntries(newVotedEntries);
      localStorage.setItem('votedEntries', JSON.stringify(newVotedEntries));
    } catch (err) {
      setError('Failed to submit vote');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Current Beat Battle
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FaClock className="text-lg" />
            <span>Time remaining: {timeRemaining}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              id={entry.id}
              artistName={entry.artist_name}
              trackTitle={entry.track_title}
              soundcloudUrl={entry.soundcloud_url}
              spotifyUrl={entry.spotify_url}
              votes={entry.votes}
              onVote={handleVote}
              hasVoted={votedEntries.includes(entry.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 