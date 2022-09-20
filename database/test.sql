-- drop database `DiscoverMusic`;

CREATE DATABASE `DiscoverMusic`;
USE `DiscoverMusic`;

SET NAMES utf8mb4; 
ALTER DATABASE `DiscoverMusic` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

# SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';



DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `userID` INT(100) NOT NULL, 
    `userName` VARCHAR(50), 
    `userEmail` VARCHAR(50), 
    -- `artistID` VARCHAR(30) DEFAULT NULL, 
    -- `userProfile` Datatype, 
    -- `searchFor` VARCHAR(40),
    PRIMARY KEY (`userID`)
    -- FOREIGN KEY (`artistID`) REFERENCES `Artist` (`artistID`),
    -- ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Artist`;
CREATE TABLE `Artist`(
    `artistID` VARCHAR(50) NOT NULL,
    `artistName` VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY(`artistID`)
    
);

DROP TABLE IF EXISTS `Album`;
CREATE TABLE `Album`(
    `albumID` VARCHAR(50) NOT NULL,
    `albumName` VARCHAR(100) DEFAULT NULL,
    -- `albumIntroduction` VARCHAR(500) DEFAULT NULL,
    `artistID` VARCHAR(50) NOT NULL,
    `likeCounter` INT,
    PRIMARY KEY(`albumID`),
    FOREIGN KEY (`artistID`) REFERENCES `Artist` (`artistID`)
    -- ON DELETE CASCADE
);

DROP TABLE IF EXISTS `Song`;
CREATE TABLE `Song` (
    `songID` VARCHAR(50)  NOT NULL,
    `artistID` VARCHAR(50) NOT NULL, 
    `songName` VARCHAR(500), 
    `likeCounter` INT, 
    `albumID` VARCHAR(30) NOT NULL,
    PRIMARY KEY(`songID`),
    FOREIGN KEY (`artistID`) REFERENCES `Artist` (`artistID`),
    # ON DELETE CASCADE
    FOREIGN KEY (`albumID`) REFERENCES `Album` (`albumID`)
    # ON DELETE CASCADE
);


DROP TABLE IF EXISTS `Review`;
CREATE TABLE `Review`(
   `firstReviewID` VARCHAR(30) NOT NULL,
   `songID` VARCHAR(50),
   `userID` INT(100),
   `reviewTime` DATETIME NOT NULL,
   `reviewContent` VARCHAR (1000),
   -- `reviewLikeCount` INT (100000) DEFAULT NULL,
   PRIMARY KEY(`firstReviewID`),
   FOREIGN KEY (`songID`) REFERENCES `Song` (`songID`),
   -- ON DELETE CASCADE
   FOREIGN KEY (`userID`) REFERENCES `User` (`userID`)
   -- ON DELETE CASCADE
);
 
 



-- DROP TABLE IF EXISTS `subReview`;
-- CREATE TABLE `subReview`(
--     `userID` INT(10) DEFAULT NULL,
--     `subReviewTime` DATETIME NOT NULL,
--     `firstReviewID` VARCHAR(30) NOT NULL,
--     `subReviewContent` VARCHAR (500) DEFAULT NULL,
--     `subReviewLikeCount` INT (100000) DEFAULT NULL,
--     PRIMARY KEY(`userID`,`Time`),
--     FOREIGN KEY (`firstReviewID`) REFERENCES `Review` (`firstReviewID`),
--     ON DELETE CASCADE
--     FOREIGN KEY (`userID`) REFERENCES `User` (`userID`),
--     ON DELETE CASCADE
-- );






-- //Trigger for album from song
-- CREATE TRIGGER AlbumTrig
-- 		AFTER INSERT ON Song
-- 		FOR EACH ROW
-- 	BEGIN
-- 		@album = SELECT albumID 


-- //Trigger for artist from song


