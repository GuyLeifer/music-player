const { Router } = require('express');
const { Artist, Album, Song, InteractionArtist } = require('../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allArtists = await Artist.findAll({
      include: [{ model: Album }, { model: Song }]
    });
    res.json(allArtists);
  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/top', async (req, res) => {
  try {
    const topTwentyArtistsMostPlayed = await Song.findAll({
      attributes: ['artistId', [sequelize.fn('sum', sequelize.col('playCount')), 'playCount']],
      include: { model: Artist },
      group: 'artistId',
      order: sequelize.literal('playCount DESC'),
      limit: 20
    });

    const topTwentyArtistsMostNew = await Artist.findAll({
      order: sequelize.literal('createdAt DESC'),
      limit: 20
    });

    const topTwentyArtistsMostLiked = await InteractionArtist.findAll({
      attributes: ['artistId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
      where: { isLiked: true },
      include: [{ model: Artist }],
      group: 'artistId',
      order: sequelize.literal('count DESC'),
      limit: 20
    });

    res.json([topTwentyArtistsMostLiked, topTwentyArtistsMostPlayed, topTwentyArtistsMostNew]);

  } catch (err) {
    res.json({ error: err })
  }
});

router.get('/:artistId', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId, {
      include: [{ model: Album }, { model: Song }]
    });
    res.json(artist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      coverImg: req.body.coverImg,
      createdAt: req.body.createdAt || new Date(),
      updatedAt: new Date()
    });
    res.json(artist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.patch('/:artistId', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId);
    await artist.update(req.body);
    res.json(artist)
  } catch (err) {
    res.json({ error: err })
  }
})

router.delete('/:artistId', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId);
    await artist.destroy();
    res.json({ deleted: true })
  } catch (err) {
    res.json({ error: err })
  }
})


module.exports = router;