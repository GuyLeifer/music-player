const { Router } = require('express');
const { Artist, InteractionArtist, User } = require('../../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const AllInteractions = await InteractionArtist.findAll({
    include: [{ model: User }, { model: Artist }]
  });
    res.json(AllInteractions);
});

router.get('/topartists', async (req, res) => {
  const topTwentyArtists = await InteractionArtist.findAll({
    attributes: ['artistId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
    where: {isLiked: true},
    include : [{ model : Artist}],
    group: 'artistId',
    order: sequelize.literal('count DESC'),
    limit: 20
  });

  res.json(topTwentyArtists);
});

router.get('/:userId&:artistId', async (req, res) => {
  const {userId, artistId} = req.params;
  const interaction = await InteractionArtist.findOne({
    where: {userId: userId, artistId: artistId}
  });
  res.json(interaction)
})

router.get('/:interactionId', async (req, res) => {
  const interaction = await InteractionArtist.findAll({
    include: [{ model: User }, { model: Artist }],
    where: {userId: req.params.interactionId}
  });
  res.json(interaction)
})

router.post('/', async (req, res) => {
    const { userId, artistId, isLiked } = req.body;
    const interaction = await InteractionArtist.create({
        userId: userId, 
        artistId: artistId, 
        isLiked: isLiked, 
        createdAt: req.body.createdAt || new Date(),
        updatedAt: new Date()
    });
    res.json(interaction)
})

router.patch('/', async (req, res) => {
  const { userId, artistId } = req.body
  const interaction = await InteractionArtist.findOne({
    where: {userId, artistId}
  });
  await interaction.update(req.body);
  res.json(interaction)
})

router.delete('/:interactionId', async (req, res) => {
  const interaction = await InteractionArtist.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;