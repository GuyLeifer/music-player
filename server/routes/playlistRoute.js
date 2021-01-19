const { Router } = require('express');
const { Playlist, PlaylistSongs, InteractionPlaylist, Song } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allPlaylists = await Playlist.findAll({
      include: [{ model: PlaylistSongs }]
    });
    return res.json(allPlaylists);
  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/top', async (req, res) => {
  try {
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
    const topTwentyPlaylistsMostPlayed = playlists.sort(function (a, b) {
      const countA = a.Song.playCount;
      const countB = b.Song.playCount;
      if (countA > countB) return -1;
      if (countA < countB) return 1;
      return 0;
    });

    const topTwentyPlaylistsMostNew = await Playlist.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });

    const topTwentyPlaylistsMostLiked = await InteractionPlaylist.findAll({
      attributes: ['playlistId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
      where: { isLiked: true },
      include: [{ model: Playlist }],
      group: 'playlistId',
      order: sequelize.literal('count DESC'),
      limit: 20
    });

    res.json([topTwentyPlaylistsMostLiked, topTwentyPlaylistsMostPlayed, topTwentyPlaylistsMostNew]);

  } catch (err) {
    res.send(err.message)
  }

});

router.get('/:playlistId', async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.playlistId, {
      include: [{ model: PlaylistSongs }]
    });
    res.json(playlist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  try {

    const playlist = await Playlist.create({
      userId: req.body.userId,
      name: req.body.name,
      coverImg: req.body.coverImg,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: new Date()
    });
    res.json(playlist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/:playlistId', async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.playlistId);
    await playlist.update(req.body);
    res.json(playlist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.delete('/', async (req, res) => {
  const { playlistId } = req.body;

  try {
    await Playlist.destroy({
      where: { id: playlistId }
    });

    await InteractionPlaylist.destroy({
      where: { playlistId: playlistId }
    });

    await PlaylistSongs.destroy({
      where: { playlistId: playlistId },
    });

    res.json({ deleted: true })

  } catch (err) {
    res.json({ error: err })
  }
})


module.exports = router;