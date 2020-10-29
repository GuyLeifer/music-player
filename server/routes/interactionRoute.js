const { Router } = require('express');
const { Song, Interaction, User } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const AllInteractions = await Interaction.findAll({
    include: [{ model: User }, { model: Song }]
  });
    res.json(AllInteractions);
});

// router.get('/:myPlaylistSongId', async (req, res) => {
//   const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId , {
//     include: [{ model: Playlist }, { model: Song }]
//   });
//   res.json(myPlaylistSong)
// })

router.get('/:interactionId', async (req, res) => {
  const interaction = await Interaction.findAll({
    include: [{ model: User }, { model: Song }],
    where: {userId: req.params.interactionId}
  });
  res.json(interaction)
})

router.post('/', async (req, res) => {
    const { userId, songId, isLiked, playCount } = req.body;
    const interaction = await PlaylistSongs.create({
        userId: userId, 
        songId: songId, 
        isLiked: isLiked, 
        playCount: playCount,
        createdAt: req.body.createdAt || new Date(),
        updatedAt: new Date()
    });
    res.json(interaction)
})

router.patch('/:interactionId', async (req, res) => {
  const interaction = await Interaction.findByPk(req.params.interactionId);
  await interaction.update(req.body);
  res.json(interaction)
})

router.delete('/:interactionId', async (req, res) => {
  const interaction = await Interaction.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;