# Music Player

## Enjoy The Music Streamer Service!

    this is a repository of a music player service.
    the service offers a diversity of songs, artists, albums and playlists.
    the repository also provides user accounts for the service.

###

the repository includes database information from SQL DataBase, ("mysql2" package).
server side with Sequelize queries and packages of authentication like: "jsonwebtoken", "sequelize", "bcrypt", "cookie-parser", to make the service safe and authorized.
the server also has a use with Elastic Search service, that provides aמ effective search for data with the package "@elastic/elasticsearch".
client side with usage of a lot of React packages, like: "react-router-dom", "styled-components-carousel", "react-youtube", "recoil". for perfect use of the service.

## Instructions To Users

1. clone this repo to your device.
2. open the folder in your editor.
3. in the Server folder create a dotenv file and write there 5 variables:  
   PORT = your server port.  
   PASSWORD = database password  
   DATABASE = database name  
   HOST = your desirable host address (127.0.0.1 for localhost)  
   TOKEN_SECRET = your authentication token
4. in the server folder run the command "npm install", same in the client folder.
5. create a new SQL Database you can do it by run the command "npm run db:create"
6. in the server folder run the commands "npm run db:migrate" for create the database construction.
7. next, run the command "npm run db:seed" to add data to database (or do it manually).
8. run the server command - "npm run dev" (to run the server).
9. run the client command (in the client folder of course) - "npm start" (to run the client and open automatically the browser).

## Home Page

    the home page contains a list of of any: songs, artists, albums, playlists and a buttons to choose the selected sort of the top option you want - most liked, most played, or the newest on the service.

![Home Page](./images/homepage.png "Home Page")

## Search Bar

    the service conatains a navigation bar with icons links to the service offers. one of the attributes of the navigation bar is the search bar, which can sort all the data in the service by name.

![Search Bar](./images/searchbar.png "Search Bar")

## Users

    the service offers a not required user account to control the playlist service, if you choose not use the user account you will successfully access to the service, but you can only use what inside it, and you will not have access to users pilot, like "create a playlist" or like a song, artist, album or playlist.

![Users Page](./images/userpage.png "Users Page")

## About

    This is a Music Streamer Included a DataBase of Songs, Artists, Albums and Playlists.
    Enjoy the Experience of the Streamer!

![About Page](./images/about.png "About Page")
