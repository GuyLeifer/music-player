const { Router } = require('express');
const { Song, PlaylistSongs, Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allPlaylistSongs = await PlaylistSongs.findAll({
    include: [{ model: Playlist }, { model: Song }]
  });
    res.json(allPlaylistSongs);
});

// router.get('/:myPlaylistSongId', async (req, res) => {
//   const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId , {
//     include: [{ model: Playlist }, { model: Song }]
//   });
//   res.json(myPlaylistSong)
// })

router.get('/:myPlaylistSongId', async (req, res) => {
  const myPlaylistSong = await PlaylistSongs.findAll({
    include: [{ model: Playlist }, { model: Song }],
    where: {playlistId: req.params.myPlaylistSongId}
  });
  res.json(myPlaylistSong)
})

router.post('/', async (req, res) => {
  const myPlaylistSong = await PlaylistSongs.create({
    playlistId: req.body.playlistId,
    songId: req.body.songId, 
    createdAt: req.body.createdAt || new Date(),
    updatedAt: new Date()
  });
  res.json(myPlaylistSong)
})

router.patch('/:myPlaylistSongId', async (req, res) => {
  const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId);
  await myPlaylistSong.update(req.body);
  res.json(myPlaylistSong)
})

router.delete('/:myPlaylistSongId', async (req, res) => {
  const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId);
  await myPlaylistSong.destroy();
  res.json({ deleted: true })
})

module.exports = router;