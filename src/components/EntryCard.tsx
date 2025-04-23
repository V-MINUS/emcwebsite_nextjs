import React from 'react';
import { FaHeart, FaSpotify, FaSoundcloud } from 'react-icons/fa';

interface EntryCardProps {
  id: string;
  artistName: string;
  trackTitle: string;
  soundcloudUrl: string;
  spotifyUrl?: string;
  votes: number;
  onVote: (entryId: string) => void;
  hasVoted: boolean;
}

const EntryCard: React.FC<EntryCardProps> = ({
  id,
  artistName,
  trackTitle,
  soundcloudUrl,
  spotifyUrl,
  votes,
  onVote,
  hasVoted
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{trackTitle}</h3>
        <p className="text-gray-600 mb-4">by {artistName}</p>
        
        <div className="mb-4">
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onVote(id)}
              disabled={hasVoted}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                hasVoted
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              <FaHeart className="text-lg" />
              <span>{votes} votes</span>
            </button>
          </div>

          <div className="flex space-x-4">
            <a
              href={soundcloudUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500"
            >
              <FaSoundcloud className="text-2xl" />
            </a>
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500"
              >
                <FaSpotify className="text-2xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryCard; 