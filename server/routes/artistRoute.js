const { Router } = require('express');
const { Artist, Album, Song } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allArtists = await Artist.findAll({
    include: [{ model: Album }, { model: Song}]
  });
  res.json(allArtists);
});

router.get('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId , {
    include: [{ model: Album }, { model: Song}]
  });
  res.json(artist)
})

router.post('/', async (req, res) => {
  const artist = await Artist.create({
    name: req.body.name,
    coverImg: req.body.coverImg, 
    createdAt: req.body.createdAt || new Date(),
    updatedAt: new Date()
  });
  res.json(artist)
})

router.patch('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.update(req.body);
  res.json(artist)
})

router.delete('/:artistId', async (req, res) => {
  const artist = await Artist.findByPk(req.params.artistId);
  await artist.destroy();
  res.json({ deleted: true })
})


module.exports = router;