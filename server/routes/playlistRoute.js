const { Router } = require('express');
const { Playlist, PlaylistSongs } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allPlaylists = await Playlist.findAll({
    include: [{ model: PlaylistSongs }]
  });
  return res.json(allPlaylists);
});

router.get('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId , {
    include: [{ model: PlaylistSongs }]
  });
  res.json(playlist)
})

router.post('/', async (req, res) => {
  const playlist = await Playlist.create({
    name: req.body.name,
    coverImg: req.body.coverImg, 
    createdAt: req.body.createdAt || new Date(), 
    updatedAt: new Date()
  });
  res.json(playlist)
})

router.patch('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.update(req.body);
  res.json(playlist)
})

router.delete('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.destroy();
  res.json({ deleted: true })
})


module.exports = router;