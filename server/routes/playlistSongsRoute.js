const { Router } = require('express');
const { Song, PlaylistSongs, Playlist } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allPlaylistSongs = await PlaylistSongs.findAll({
      include: [{ model: Playlist }, { model: Song }]
    });
    res.json(allPlaylistSongs);
  } catch (err) {
    res.json({ error: err })
  }
});

// router.get('/:myPlaylistSongId', async (req, res) => {
//   const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId , {
//     include: [{ model: Playlist }, { model: Song }]
//   });
//   res.json(myPlaylistSong)
// })

router.get('/:playlistId', async (req, res) => {
  try {
    const myPlaylistSong = await PlaylistSongs.findAll({
      include: [{ model: Playlist }, { model: Song }],
      where: { playlistId: req.params.playlistId }
    });
    res.json(myPlaylistSong)
  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/:playlistId&:songId', async (req, res) => {
  try {
    const myPlaylistSong = await PlaylistSongs.findAll({
      include: [
        { model: Playlist },
        { model: Song }
      ],
      where: { playlistId: req.params.playlistId, songId: req.params.songId }
    });
    res.json(myPlaylistSong)
  } catch (err) {
    res.json({ error: err })
  }
});

router.post('/', async (req, res) => {
  try {
    const myPlaylistSong = await PlaylistSongs.create({
      playlistId: req.body.playlistId,
      songId: req.body.songId,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: new Date()
    });
    res.json(myPlaylistSong)
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/:myPlaylistSongId', async (req, res) => {
  try {
    const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId);
    await myPlaylistSong.update(req.body);
    res.json(myPlaylistSong)
  } catch (err) {
    res.json({ error: err })
  }
})

// router.delete('/:myPlaylistSongId', async (req, res) => {
//   const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId);
//   await myPlaylistSong.destroy();
//   res.json({ deleted: true })
// })

router.delete('/', async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    if (songId && playlistId) {
      const myPlaylistSong = await PlaylistSongs.findOne({
        where: { playlistId: playlistId, songId: songId },
      });
      await myPlaylistSong.destroy();
    } else if (playlistId) {
      const myPlaylistSongs = await PlaylistSongs.findAll({
        where: { playlistId: playlistId },
      });
      await myPlaylistSongs.destroy();
    }
    res.json({ deleted: true })
  } catch (err) {
    res.json({ error: err })
  }
})
module.exports = router;