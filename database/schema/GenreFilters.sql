CREATE TABLE GenreFilters
(
  Email VARCHAR(255) NOT NULL,
  Genre VARCHAR(255) NOT NULL,
  PRIMARY KEY (Email, Genre),
  FOREIGN KEY (Email) REFERENCES QuarterlyVibesUser(Email)
);