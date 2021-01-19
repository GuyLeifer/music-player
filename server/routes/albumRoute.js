const { Router } = require('express');
const { Album, Song, Artist, InteractionAlbum } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allAlbums = await Album.findAll({
      include: [{ model: Artist }, { model: Song }]
    });
    res.json(allAlbums);
  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/top', async (req, res) => {
  try {
    const topTwentyAlbumsMostPlayed = await Song.findAll({
      attributes: ['albumId', [sequelize.fn('sum', sequelize.col('playCount')), 'playCount']],
      include: { model: Album },
      group: 'albumId',
      order: sequelize.literal('playCount DESC'),
      limit: 20
    })
    const topTwentyAlbumsMostNew = await Album.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });

    const topTwentyAlbumsMostLiked = await InteractionAlbum.findAll({
      attributes: ['albumId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
      where: { isLiked: true },
      include: [{ model: Album }],
      group: 'albumId',
      order: sequelize.literal('count DESC'),
      limit: 20
    });

    res.json([topTwentyAlbumsMostLiked, topTwentyAlbumsMostPlayed, topTwentyAlbumsMostNew]);
  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/:albumId', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.albumId, {
      include: [{ model: Artist }, { model: Song }]
    });
    res.json(album)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  try {
    const album = await Album.create({
      name: req.body.name,
      artistId: req.body.artistId,
      coverImg: req.body.coverImg,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: new Date()
    });
    res.json(album)
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/:albumId', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.albumId);
    await album.update(req.body);
    res.json(artist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.delete('/:albumId', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.albumId);
    await album.destroy();
    res.json({ deleted: true })
  } catch (err) {
    res.json({ error: err })
  }
})


module.exports = router;