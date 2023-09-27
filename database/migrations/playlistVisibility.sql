ALTER TABLE QuarterlyVibesUser
ADD PlaylistVisibilityType VARCHAR(15) NOT NULL CHECK (PlaylistVisibilityType IN ('public', 'private'))
DEFAULT 'public';
