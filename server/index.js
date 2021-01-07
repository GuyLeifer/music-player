require('dotenv/').config();
const app = require('./app');

const { Album, Song, Artist, Playlist, User } = require('./models');

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const port = process.env.PORT;

const deleteElasticData = async () => {
  await client.indices.delete(
    {
      index: '*',
    }
  );
}
const updateElasticData = async (index, dataArray) => {
  try {
    await client.indices.create(
      {
        index: index,
      }
    );
    const body = dataArray.flatMap((doc) => [
      { index: { _index: index } },
      doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
      console.log("ERROR");
      return bulkResponse.errors;
    } else {
      const { body: count } = await client.count({ index: index });
      console.log(count);
      return bulkResponse;
    }
  } catch (err) {
    return (err.massage)
  }
}
app.listen(port, async () => {

  try {
    deleteElasticData();
    const songs = await Song.findAll({
      attributes: ['id', 'title']
    });
    const artists = await Artist.findAll({
      attributes: ['id', 'name']
    });
    console.log(artists)
    const albums = await Album.findAll({
      attributes: ['id', 'name']
    });
    const playlists = await Playlist.findAll({
      attributes: ['id', 'name']
    });
    const users = await User.findAll({
      attributes: ['id', 'name']
    });

    const updateSongs = updateElasticData('songs', songs);
    const updateArtists = updateElasticData('artists', artists);
    const updateAlbums = updateElasticData('albums', albums);
    const updatePlaylists = updateElasticData('playlists', playlists);
    const updateUsers = updateElasticData('users', users);
    console.log(updateSongs, updateArtists, updateAlbums, updatePlaylists, updateUsers)
  } catch (err) {
    console.log("err", err.message);
  }

  console.log(`app listening at http://localhost:${port}`)
})