-- Insert a test competition
INSERT INTO competitions (start_date, end_date, status)
VALUES (
  TIMEZONE('utc'::text, NOW()),
  TIMEZONE('utc'::text, NOW() + INTERVAL '5 days'),
  'active'
);

-- Insert some test entries
INSERT INTO entries (artist_name, track_title, soundcloud_url, status)
VALUES 
  ('Test Artist 1', 'Amazing Track 1', 'https://soundcloud.com/test1', 'active'),
  ('Test Artist 2', 'Cool Beat 2', 'https://soundcloud.com/test2', 'active'),
  ('Test Artist 3', 'Fire Track 3', 'https://soundcloud.com/test3', 'active');

-- Insert some test votes
INSERT INTO votes (entry_id)
SELECT id FROM entries LIMIT 2; 