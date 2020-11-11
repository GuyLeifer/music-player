const { Router } = require('express');
const { Playlist, PlaylistSongs, InteractionPlaylist, Song } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const allPlaylists = await Playlist.findAll({
    include: [{ model: PlaylistSongs }]
  });
  return res.json(allPlaylists);
});

router.get('/top/:option', async (req, res) => {
  const option = req.params.option;
  if (option === "play") {
    const playlists = await PlaylistSongs.findAll({
      include: [{ 
        model: Song, 
        attributes: [[sequelize.fn('sum', sequelize.col('playCount')), 'playCount']],
      },
      {
        model: Playlist
      }
    ],
    attributes: ['playlistId', 'songId'],
    group: 'playlistId',
    })
    const topTwentyPlaylists = playlists.sort(function(a, b) {
      const countA = a.Song.playCount;
      const countB = b.Song.playCount;
      if (countA > countB) return -1;
      if (countA < countB) return 1;
      return 0;
    });

    res.json(topTwentyPlaylists);
    
  } else if (option === "new") {
    const topTwentyPlaylists = await Playlist.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });
    res.json(topTwentyPlaylists);
  }
});

router.get('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId , {
    include: [{ model: PlaylistSongs }]
  });
  res.json(playlist)
})

router.post('/', async (req, res) => {
  const playlist = await Playlist.create({
    userId: req.body.userId,
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

router.delete('/', async (req, res) => {
  const { playlistId } = req.body;

  await Playlist.destroy({
    where: {id: playlistId}
  });

  await InteractionPlaylist.destroy({
    where: {playlistId: playlistId}
  });

  await PlaylistSongs.destroy({
    where: {playlistId: playlistId},
  });

  res.json({ deleted: true })
})


module.exports = router;