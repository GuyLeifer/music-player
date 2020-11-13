const { Router } = require('express');
const { Album, Song, Artist, InteractionAlbum } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll({
    include: [{model: Artist}, {model: Song}]
  });
  res.json(allAlbums);
});

router.get('/top', async (req, res) => {

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
    where: {isLiked: true},
    include : [{ model : Album}],
    group: 'albumId',
    order: sequelize.literal('count DESC'),
    limit: 20
  });

  res.json([topTwentyAlbumsMostLiked, topTwentyAlbumsMostPlayed, topTwentyAlbumsMostNew]);
});

router.get('/:albumId', async (req, res) => {
    const album = await Album.findByPk(req.params.albumId , {
      include: [{model: Artist}, {model: Song}]
    });
    res.json(album)
  })
  
  router.post('/', async (req, res) => {
    const album = await Album.create({
      name: req.body.name,
      artistId: req.body.artistId,
      coverImg: req.body.coverImg, 
      createdAt: req.body.createdAt || new Date(), 
      updatedAt: new Date()
    });
    res.json(album)
  })

  router.patch('/:albumId', async (req, res) => {
    const album = await Album.findByPk(req.params.albumId);
    await album.update(req.body);
    res.json(artist)
  })
  
  router.delete('/:albumId', async (req, res) => {
    const album = await Album.findByPk(req.params.albumId);
    await album.destroy();
    res.json({ deleted: true })
  })


module.exports = router;