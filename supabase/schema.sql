-- Drop existing tables if they exist
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS entries CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS competitions CASCADE;

-- Create entries table for track submissions
CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_name TEXT NOT NULL,
  track_title TEXT NOT NULL,
  soundcloud_url TEXT NOT NULL,
  spotify_url TEXT,
  votes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'winner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create artists table
CREATE TABLE artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  soundcloud_url TEXT,
  spotify_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  image_url TEXT,
  ticket_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create votes table to track voting history
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entry_id UUID REFERENCES entries(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create competitions table to manage competition periods
CREATE TABLE competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_entries_status ON entries(status);
CREATE INDEX idx_entries_created_at ON entries(created_at);
CREATE INDEX idx_votes_entry_id ON votes(entry_id);
CREATE INDEX idx_competitions_status ON competitions(status);

-- Set up RLS policies for entries
CREATE POLICY "Entries are viewable by everyone"
  ON entries FOR SELECT
  USING (true);

CREATE POLICY "Entries can be inserted by authenticated users"
  ON entries FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Set up RLS policies for artists
CREATE POLICY "Artists are viewable by everyone"
  ON artists FOR SELECT
  USING (true);

CREATE POLICY "Artists can be inserted by authenticated users"
  ON artists FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Set up RLS policies for events
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Events can be inserted by authenticated users"
  ON events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Set up RLS policies for votes
CREATE POLICY "Votes are viewable by everyone"
  ON votes FOR SELECT
  USING (true);

CREATE POLICY "Votes can be inserted by authenticated users"
  ON votes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Set up RLS policies for competitions
CREATE POLICY "Competitions are viewable by everyone"
  ON competitions FOR SELECT
  USING (true);

CREATE POLICY "Competitions can be inserted by authenticated users"
  ON competitions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for entries table
CREATE TRIGGER update_entries_updated_at
  BEFORE UPDATE ON entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 