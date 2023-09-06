CREATE TABLE PlaylistsCreated
(
  Email VARCHAR(255),
  PlaylistId VARCHAR(255),
  MonthCreated INT,
  YearCreated INT,
  PRIMARY KEY (Email, MonthCreated, YearCreated),
  FOREIGN KEY (Email) REFERENCES QuarterlyVibesUser(Email)
);