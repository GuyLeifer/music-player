const { Router } = require('express');
const { Album, Song, Artist } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Album.findAll({
    include: [{model: Artist}, {model: Song}]
  });
  res.json(allAlbums);
});

router.get('/top/:option', async (req, res) => {
  const option = req.params.option;
  if (option === "play") {
    const topTwentyAlbums = await Song.findAll({
      attributes: ['albumId', [sequelize.fn('sum', sequelize.col('playCount')), 'playCount']],
      include: { model: Album },
      group: 'albumId',
      order: sequelize.literal('playCount DESC'),
      limit: 20
    })
    res.json(topTwentyAlbums);
  } else if (option === "new") {
    const topTwentyAlbums = await Album.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });
    res.json(topTwentyAlbums);
  }
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