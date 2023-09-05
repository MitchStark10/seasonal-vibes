CREATE TABLE PlaylistsCreated
(
  Email VARCHAR(255),
  PlaylistId VARCHAR(255),
  MonthCreated VARCHAR(30),
  YearCreated INT,
  PRIMARY KEY (Email, MonthCreated, YearCreated),
  FOREIGN KEY (Email) REFERENCES QuarterlyVibesUser(Email)
);