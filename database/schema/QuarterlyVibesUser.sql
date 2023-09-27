CREATE TABLE QuarterlyVibesUser
(
  Email VARCHAR(255) NOT NULL PRIMARY KEY,
  SpotifyRefreshToken VARCHAR(255) NOT NULL,
  SpotifyId VARCHAR(255) NOT NULL,
  IsSubscribed BIT DEFAULT 1,
  PlaylistVisibilityType VARCHAR(15) NOT NULL CHECK (PlaylistVisibilityType IN ('public', 'private')) DEFAULT 'public'
);
