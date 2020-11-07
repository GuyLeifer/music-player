const { Router } = require('express');
const { Song, InteractionSong, User } = require('../../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
    const AllInteractions = await InteractionSong.findAll({
      include: [{ model: User }, { model: Song }]
    });
      res.json(AllInteractions);
});

router.get('/topsongs', async (req, res) => {
  const topTwentySongs = await InteractionSong.findAll({
    attributes: ['songId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
    where: {isLiked: true},
    include : [{ model : Song}],
    group: 'songId',
    order: sequelize.literal('count DESC'),
    limit: 20
  });

  res.json(topTwentySongs);
});


router.get('/:userId&:songId', async (req, res) => {
  const {userId, songId} = req.params;
  const interaction = await InteractionSong.findOne({
    where: {userId: userId, songId: songId}
  });
  res.json(interaction)
})

router.post('/', async (req, res) => {
    const { userId, songId, isLiked, playCount } = req.body;
    const interaction = await InteractionSong.create({
        userId: userId, 
        songId: songId, 
        isLiked: isLiked, 
        playCount: playCount,
        createdAt: req.body.createdAt || new Date(),
        updatedAt: new Date()
    });
    res.json(interaction)
})

router.patch('/', async (req, res) => {
  const { userId, songId } = req.body
  const interaction = await InteractionSong.findOne({
    where: {userId, songId}
  });
  await interaction.update(req.body);
  res.json(interaction)
})

router.delete('/:interactionId', async (req, res) => {
  const interaction = await InteractionSong.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;