const { Router } = require('express');
const { Song, Artist, Album, PlaylistSongs, Playlist, InteractionSong } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const allSongs = await Song.findAll({
    include: [{ model: Artist }, { model: Album }]
  });
    res.json(allSongs);
});

router.get('/top', async (req, res) => {
    const topTwentySongsMostPlayed = await Song.findAll({
      order: sequelize.literal('playCount DESC'),
      limit: 20
    });

    const topTwentySongsMostNew = await Song.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });

    const topTwentySongsMostLiked = await InteractionSong.findAll({
      attributes: ['songId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
      where: {isLiked: true},
      include : [{ model : Song}],
      group: 'songId',
      order: sequelize.literal('count DESC'),
      limit: 20
    });
    res.json([topTwentySongsMostLiked, topTwentySongsMostPlayed, topTwentySongsMostNew]);
  });

router.get('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId , {
    include: [
      { model: Artist, include: [{ model: Album }, { model: Song}] }, 
      { model: Album, include: [{ model: Artist }, { model: Song}] }, 
      { model: PlaylistSongs, include: {model: Playlist}, where: {songId: req.params.songId}, required: false }
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
  const { playCount } = req.body;
  if(!playCount) {
    const song = await Song.findByPk(req.params.songId);
    await song.update(req.body);
    res.json(song)
  } else if (playCount === 1) {
    try {
      const song = await Song.findByPk(req.params.songId);
      await song.increment('playCount');
      res.json(song)
    } catch (err) {
      throw err;
    }
  }
})

router.delete('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.destroy();
  res.json({ deleted: true })
})

module.exports = router;