const { Router } = require('express');
const { Album, InteractionAlbum, User } = require('../../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const AllInteractions = await InteractionAlbum.findAll({
    include: [{ model: User }, { model: Album }]
  });
    res.json(AllInteractions);
});

router.get('/topalbums', async (req, res) => {
  const topTwentyAlbums = await InteractionAlbum.findAll({
    attributes: ['albumId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
    where: {isLiked: true},
    include : [{ model : Album}],
    group: 'albumId',
    order: sequelize.literal('count DESC'),
    limit: 20
  });

  res.json(topTwentyAlbums);
});

router.get('/:userId&:albumId', async (req, res) => {
  const {userId, albumId} = req.params;
  const interaction = await InteractionAlbum.findOne({
    where: {userId: userId, albumId: albumId}
  });
  res.json(interaction)
})

router.get('/:interactionId', async (req, res) => {
  const interaction = await InteractionAlbum.findAll({
    include: [{ model: User }, { model: Album }],
    where: {userId: req.params.interactionId}
  });
  res.json(interaction)
})

router.post('/', async (req, res) => {
    const { userId, albumId, isLiked } = req.body;
    const interaction = await InteractionAlbum.create({
        userId: userId, 
        albumId: albumId, 
        isLiked: isLiked, 
        createdAt: req.body.createdAt || new Date(),
        updatedAt: new Date()
    });
    res.json(interaction)
})

router.patch('/', async (req, res) => {
  const { userId, albumId } = req.body
  const interaction = await InteractionAlbum.findOne({
    where: {userId, albumId}
  });
  await interaction.update(req.body);
  res.json(interaction)
})

router.delete('/:interactionId', async (req, res) => {
  const interaction = await InteractionAlbum.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;