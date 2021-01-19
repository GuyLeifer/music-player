const express = require('express');

const path = require('path');

const app = express();

app.use(express.json());

app.use('/api/songs', require('./routes/songRoute'));
app.use('/api/albums', require('./routes/albumRoute'));
app.use('/api/artists', require('./routes/artistRoute'));
app.use('/api/playlists', require('./routes/playlistRoute'));
app.use('/api/playlistsongs', require('./routes/playlistSongsRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/interactions', require('./routes/interactionsRoutes'));
app.use('/api/search', require('./routes/searchRoute'));
app.use('/api/elasticsearch', require('./routes/elasticSearch'));

app.use(express.static(path.join(__dirname, "../client", "build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});



module.exports = app;