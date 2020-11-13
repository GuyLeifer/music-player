const express = require('express');

const app = express();
app.use(express.json());

app.use('/songs', require('./routes/songRoute'));
app.use('/albums', require('./routes/albumRoute'));
app.use('/artists', require('./routes/artistRoute'));
app.use('/playlists', require('./routes/playlistRoute'));
app.use('/playlistsongs', require('./routes/playlistSongsRoute'));
app.use('/users', require('./routes/userRoute'));
app.use('/interactions', require('./routes/interactionsRoutes'));
app.use('/search', require('./routes/searchRoute'));
app.use('/elasticsearch', require('./routes/elasticSearch'));

app.get('/', (req, res) => {
  res.send('You entered to the Server Port!')
});


module.exports = app;