const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // convert to json

const db = mysql.createConnection({
    user: "root",
    host: "34.123.223.185", // rmor
    // host: "107.178.223.200",
    password: "test1234",
    // host: "localhost",
    // password: "abc123",
    database: "discovermusic"
});

// db.connect(function(err) {
//     if (err) throw err;
//     db.query("SELECT * FROM Artist", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });

app.post("/search",(req, res) => {
    console.log(req.body);
    const name = req.body.name //get from fe
    //const id = req.body.id
    //console.log("name" + "id");

    const fullname = "%" + name + "%"
    //const searchQuery = ""
    // db.query(
    //     'SELECT * FROM Artist WHERE artistName LIKE ?',
    // [fullname],

    db.query(
        '(SELECT s.songID AS sID,s.songName AS sName, s.likeCounter AS sLikes, alb.albumID AS alID, alb.albumName AS alName , art.artistID AS artID, art.artistName AS artName\
        FROM Artist art NATURAL JOIN Song s LEFT JOIN Album alb ON (s.albumID = alb.albumID) \
        WHERE s.songName LIKE ? \
        LIMIT 5) \
        UNION \
        (SELECT NULL AS sID, NULL AS sName, NULL AS sLikes, albumID AS alID, albumName AS alName , artistID AS artID, artistName AS artName \
        FROM Album NATURAL JOIN Artist ar \
        WHERE albumName LIKE ? \
        LIMIT 5)\
        UNION \
        (SELECT NULL AS sID, NULL AS sName, NULL AS sLikes, NULL AS alID, NULL AS alName , artistID AS artID, artistName AS artName \
        FROM Artist \
        WHERE artistName LIKE ? \
        LIMIT 5)',
    [fullname,fullname,fullname],

    // db.query("INSERT INTO Artist (artistId, artistName) VALUE (?,?)",
    // [name],
    //[id, name],

    //call back func
    
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
    
            //console.log(result)
            res.send(result);
        }
    }
    );
});



app.put("/like",(req, res) => {
    //console.log(req.body);
    const songId = req.body.songID //get from fe
    //console.log(songId);
    const addedLike = req.body.likeCounter + 1

   // console.log(addedLike);
    db.query("UPDATE Song s SET s.likeCounter = ? WHERE s.songID = ?",
    //db.query("SELECT likeCounter FROM Song s WHERE s.songID = ?",
    [addedLike, songId],
    //[songId],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
        
            console.log(result)
            res.send(result);
        }
    }
    );
});

// app.get('/topartist',(req,res) => {
//     db.query("SELECT art.artistName, SUM(s.likeCounter) AS sumLike FROM Song s NATURAL JOIN Artist art GROUP BY artistID ORDER BY sumLike DESC LIMIT 15; ",(err, result) => {
//     //db.query("SELECT * FROM Artist",(err, result) => {
//         if (err){
//             console.log(err);
//         } else {
//             res.send(result);
//         }    
//     })

// })

app.get('/topartist',(req,res) => {
    db.query("SELECT art.artistName, SUM(s.likeCounter) AS sumLike FROM Song s NATURAL JOIN Artist art GROUP BY artistID ORDER BY sumLike DESC LIMIT 15",(err, result) => {
    //db.query("SELECT * FROM Artist",(err, result) => {
        if (err){
            console.log(err);
        } else {
            
            res.send(result);
        }    
    })

})

app.get('/tophot',(req,res) => {
    db.query("SELECT s.songName, s.hotCounter \
    FROM Song s \
    WHERE s.hotCounter IS NOT NULL\
    ORDER BY hotCounter DESC \
    LIMIT 10",(err, result) => {
    //db.query("SELECT * FROM Artist",(err, result) => {
        if (err){
            console.log(err);
        } else {
            
            res.send(result);
        }    
    })

})

app.get('/comments',(req,res) => {
  
    db.query("SELECT ",
    (err, result) => {
    db.query("SELECT u.userName, s.songName, r.reviewContent, r.firstReviewID \
            FROM Song s RIGHT JOIN Review r ON (s.songID = r.songID) LEFT JOIN `User` u ON (r.userID = u.userID) \
            WHERE u.userID = 0001",
        (err, result) => {
        if (err){
            console.log(err);
        } else {
            
            res.send(result);
        }    
    })

})
})

app.put("/delete",(req, res) => {
    //console.log(req.body);
    const firstReviewID = req.body.firstReviewID //get from fe
    //console.log(songId);

   // console.log(addedLike);
    db.query("DELETE FROM Review r WHERE r.firstReviewID = ?",
    //db.query("SELECT likeCounter FROM Song s WHERE s.songID = ?",
    [firstReviewID],
    //[songId],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
        
            console.log(result)
            res.send(result);
        }
    }
    );
});


app.get("/insert",(req, res) => {
    console.log(req.body);

    db.query(
        'SELECT MAX(firstReviewID) as max\
        FROM Review ', (err, result)=> {
            if(err){
                console.log(err);
            } else {
                console.log(result[0].max)
                //firstReviewID = result[0].max + 1;
                //console.log(firstReviewID)
                res.send(result)
            }
        }
    )

    

});

app.put("/insert2",(req, res) => {
    const songID = req.body.songID
    const reviewContent = req.body.reviewContent //get from fe
    const firstReviewID = req.body.firstReviewID
    const currUser = req.body.currUser
    db.query(
        'INSERT INTO Review (firstReviewID, songID, userID, reviewContent, reviewTime) VALUE (?,?, ?, ?, "2022-03-10 02:01:01")',
    [firstReviewID, songID, currUser, reviewContent],
    
    (err,result)=>{
        if(err){
            console.log(err + currUser);
        } else {
    
            //console.log(result)
            res.send("success");
        }
    }
    );
});

app.post("/login",(req, res) => {
    console.log(req.body);
    const userName = req.body.userName //get from fe
    const password = req.body.password
  
    db.query(
        'CALL Login(?,? ,@return_statement, @user_id_return, @user_name_return, @review_count_return)'
        ,
    [userName, password],
  
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            console.log("SP output: " + result.data)
            res.send(result);
        }
    }
    );
});




app.listen(3001, ()=>{
    console.log("run")
})

