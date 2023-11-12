CREATE TABLE QuarterlyVibesUser
(
  Email VARCHAR(255) NOT NULL PRIMARY KEY,
  SpotifyRefreshToken VARCHAR(255) NOT NULL,
  SpotifyId VARCHAR(255) NOT NULL,
  IsSubscribed BIT DEFAULT 1,
  QuantityOfSongsPerPlaylist SMALLINT DEFAULT 25
);
