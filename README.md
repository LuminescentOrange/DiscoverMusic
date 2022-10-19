# DiscoverMusic

## Demo Video

https://drive.google.com/file/d/1V2sx33wIKlg8nmQWxqk9dUYVoZQNs21K/view?usp=sharing

## Project Summary
Our project is to design a website that collects most of famous artists and all of their songs, allows a user to search for albums, artists, or songs, and lets them read or write reviews. This also allows them to see which reviews seem more credible by an upvote system from other users. Music connoisseurs can share their opinions and give recommendations/feedback while music novices can look at music and see what they resonate with as well as what others in the community enjoy.


## Database Design

![avatar](/database_design/ER-Diagram.jpg)


## Description

We want our application to be a web app that users can utilize to discover new artists and what songs from said artists that fellow users of our web app find popular. One problem with current music streaming services is that all recommendations for artists are their most current music. We seek to remedy this by instead sorting songs from each artist in terms of how many “upvotes” the song itself has received from the community. Furthermore most music streaming services do not have the option to add comments for songs or artists. We want to include that functionality in our web app as we recognize that users being able to read reviews by fellow users on certain songs can help them find what song they may enjoy.


## Usefulness

We believe that our chosen application will be useful because it offers the ability for users to find community favorite songs for artists they may not yet know or may have just been introduced to. We are aware that there are many other music services that can accomplish these tasks, the most notable US-based applications being Spotify, Apple Music, and SoundCloud. However our application, unlike the more mainstream ones, will rely more on user community inputs in order to boost up certain songs from specific artists. While the more mainstream applications build their top songs lists from algorithms and trends we hope to have a more direct connection with our user community by having the users themselves select what songs from an artist are placed higher up on their rankings. 
	

## Realness

The data our group plans to use is the names and songs of music artists. We plan to get this data using a web crawler function and utilize that function on sites such as spotify or soundcloud to generate and store that database. We can directly use the Spotify api for our purposes to get data on artists and albums and put them in a database. Another database we will need to incorporate will be a user community created one. That will be the song specific comments which will be from user data.
 

## Function

Our website will open with a page with an option for users to search whatever artist they are interested in discovering. The user will input the name of the artists they wish to discover. If the user does not input the full name of the artist, the website will return recommendations that fit the artists that are stored in our first main database. That database will hold each name and relevant identifying information (ex. Picture of artist ) for all artists that we input into the database. Next, the user will be able to select the artist they want and the website will then return information from another database, songs made by each artist. These songs will be returned in an order decided by the user community. To achieve this, we will have an “upvote” system that users can click on a button, send an update to the song database and the song database will recognize this change and return songs in order according to their popularity. Next, users will be able to select any given song from the artist they have selected, click on the song and receive information from another database: comments and their corresponding ratings for each song. Hand-in-hand with the previous feature, users will be able to update the song’s comments database by adding their own comments and rating. We plan to sort the comments by date and time uploaded to the database. Some additional components we hope to implement if we have time to complete them would be a filtering tool to search artists by. The filtering would consider attributes such as music genre and year released. We would also like to include an option to add artists and their songs to our database. Finally we would also like to be able to have a filtering option for song specific comments according to characteristics such as oldest, newest, highest rating, lowest rating. 
 

## A low fidelity UI mockup

https://docs.google.com/presentation/d/1h5GG7GMeqPGxtAdVJi9H8smKUZA3HcD7F-INGj2Pkkg/edit?usp=sharing


## Team Information

|   Info      |        Description     |
| ----------- | ---------------------- |
| TeamID      |         Team-032       |
| TeamName    |          aTeam         |
| Member1     |      Daniel Dilan      |
| Member1     |  ddilan2@illinois.edu  |
| Member2     |   Rithik Morusupalli   |
| Member2     |  rmorus2@illinois.edu  |
| Member3     |      Qiyuan Cheng      |
| Member3     | qiyuanc3@illinois.edu  |
| Member4     |     Aryaman Joshi      |
| Member4     | aryaman5@illinois.edu  |


## Project work distribution

Data Acquisation and Formatting - Daniel, Rithik

Database Design - Qiyuan, Daniel, Rithik

UI Design/Development - Qiyuan, Daniel, Aryaman

Backend Development - Daniel, Qiyuan