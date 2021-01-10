const express = require('express');

const app = express();
app.use(express.static("../client/build"));
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


module.exports = app;