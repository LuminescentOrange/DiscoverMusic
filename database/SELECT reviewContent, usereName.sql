SELECT userName, reviewContent, songName
FROM Song NATURAL JOIN Review NATURAL JOIN `User`
WHERE 

SELECT artistName
FROM song 
GROUP BY songID
HAVING MAX(likeCounter);



CREATE INDEX reUseID ON Review(userID);
CREATE INDEX songCounter ON Song(likeCounter);
CREATE INDEX songSongID ON Song(songID);



SELECT art.artistName, SUM(s.likeCounter) AS sumLike
FROM Song s NATURAL JOIN Artist art
GROUP BY artistID
ORDER BY sumLike DESC
LIMIT 15;

CREATE INDEX songCounter ON Song(likeCounter)
CREATE INDEX artArtID ON Artist(artistID)
CREATE INDEX songSongID ON Song(songID)
