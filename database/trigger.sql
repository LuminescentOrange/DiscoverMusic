DELIMITER |

CREATE TRIGGER sumhotcounter AFTER INSERT ON review FOR EACH ROW
BEGIN
    SET @likecounter = (SELECT s.likeCounter
                         FROM song s
                         WHERE new.songID = s.songID
                         );    
    SET @sumofreview = (SELECT COUNT(r.firstReviewID)
                        FROM review r
                        WHERE new.songID = r.songID
                        GROUP BY r.songID
                        );                     
    IF (@likecounter > 0 AND @likecounter <= 2000) THEN
        UPDATE song SET hotCounter = 50 + 5 * @sumofreview WHERE songID = new.songID;
    ELSEIF (@likecounter > 2000 AND @likecounter <= 4000) THEN
	UPDATE song SET hotCounter = 100 + 5 * @sumofreview WHERE songID = new.songID;
    ELSEIF (@likecounter > 4000 AND @likecounter <= 6000) THEN
	UPDATE song SET hotCounter = 150 + 5 * @sumofreview WHERE songID = new.songID;
    ELSEIF (@likecounter > 6000 AND @likecounter <= 8000) THEN
	UPDATE song SET hotCounter = 200 + 5 * @sumofreview WHERE songID = new.songID;
    ELSEIF (@likecounter > 8000 AND @likecounter <= 10000) THEN
	UPDATE song SET hotCounter = 300 + 5 * @sumofreview WHERE songID = new.songID;
    ELSEIF (@likecounter > 10000) THEN
	UPDATE song SET hotCounter = 400 + 5 * @sumofreview WHERE songID = new.songID;
    END IF;
END;
|

DELIMITER ;
INSERT INTO review
VALUE (18, "1BULoMJ8x4tWrEd05MHP8x", 1,"2022-03-10 02:01:01", "triggertest1");
INSERT INTO review
VALUE (20, "1fVOx2kjTsz6NjXXvXYiaX", 1,"2022-03-10 02:01:01", "triggertest2");
SELECT *
FROM song
WHERE songName LIKE "%one%";

# delete from review where songID = "1BULoMJ8x4tWrEd05MHP8x";
# DELETE FROM review WHERE songID = "1fVOx2kjTsz6NjXXvXYiaX";

SELECT s.songName, s.hotCounter
FROM song s
ORDER BY hotCounter DESC
LIMIT 10

