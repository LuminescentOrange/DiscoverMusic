DELIMITER |
CREATE PROCEDURE Login (IN uname VARCHAR(50), IN pass VARCHAR(50), OUT return_statement VARCHAR(100), OUT user_id_return INT,OUT user_name_return VARCHAR(50), OUT review_count_return INT)
 
BEGIN
    -- DECLARE return_statement VARCHAR(100);
    DECLARE user_exists BOOLEAN DEFAULT FALSE;
    -- DECLARE user_id_return INT DEFAULT NULL;
    DECLARE currUserName VARCHAR(50);
    DECLARE currUserEmail VARCHAR(50);
    DECLARE currUserPass VARCHAR(50);
    DECLARE currUserID INT;
    DECLARE loop_exit BOOLEAN DEFAULT FALSE;
    DECLARE userInfo CURSOR FOR (SELECT *
                                 FROM `user` NATURAL JOIN `password`
                                 -- GROUP BY userName
                                );
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET loop_exit = TRUE;
    
    OPEN userInfo;
    cloop: LOOP
        
        FETCH userInfo INTO currUserID, currUserName,currUserEmail,currUserPass;
        IF loop_exit = TRUE THEN
            LEAVE cloop;
        END IF;
        
        IF (currUserName = uname AND currUserPass = pass) THEN
		SET user_exists = TRUE;
		SET user_id_return = currUserID;
		SET user_name_return = currUserName;
		SET return_statement = 'Welcome';
		
		SELECT userName, COUNT(firstReviewID)
		INTO user_name_return, review_count_return
		FROM review R NATURAL JOIN `user` u
		GROUP BY userID
		HAVING u.userName = uname;
		
	ELSEIF (currUserName = uname) THEN
		SET user_exists = TRUE;
		SET return_statement = 'wrong password';
		SET review_count_return = 0;
	END IF;
       
  
    END LOOP cloop;
    CLOSE userInfo;
    
    IF (user_exists = FALSE) THEN
	SELECT 'No user', user_id_return, user_name_return, review_count_return;
    ELSE
	SELECT return_statement, user_id_return, user_name_return, review_count_return;
    END IF;   
    
END;
|
DELIMITER ;