const { Router } = require('express');
const { Song, Artist, Album, PlaylistSongs, Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allSongs = await Song.findAll({
    include: [{ model: Artist }, { model: Album }]
  });
    res.json(allSongs);
});

router.get('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId , {
    include: [
      { model: Artist, include: [{ model: Album }, { model: Song}] }, 
      { model: Album, include: [{ model: Artist }, { model: Song}] }, 
      { model: PlaylistSongs, include: {model: Playlist}, where: {songId: req.params.songId} }
    ],   
  });
  res.json(song)
})

router.post('/', async (req, res) => {
  const song = await Song.create({
    title: req.body.title,
    artistId: req.body.artistId,
    albumId: req.body.albumId, 
    youtubeLink: req.body.youtubeLink, 
    length: req.body.length, 
    trackNumber: req.body.trackNumber, 
    lyrics: req.body.lyrics, 
    createdAt: req.body.createdAt || new Date(), 
    updatedAt: new Date()
  });
  res.json(song)
})

router.patch('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.update(req.body);
  res.json(song)
})

router.delete('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.destroy();
  res.json({ deleted: true })
})

module.exports = router;