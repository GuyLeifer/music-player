const { Router } = require('express');
const { Playlist, InteractionPlaylist, User } = require('../../models');
const sequelize = require('sequelize');

const router = Router();

router.get('/', async (req, res) => {
  const AllInteractions = await InteractionPlaylist.findAll({
    include: [{ model: User }, { model: Playlist }]
  });
    res.json(AllInteractions);
});

router.get('/topplaylists', async (req, res) => {
  const topTwentyPlaylists = await InteractionPlaylist.findAll({
    attributes: ['playlistId', [sequelize.fn('count', sequelize.col('isLiked')), 'count']],
    where: {isLiked: true},
    include : [{ model : Playlist}],
    group: 'playlistId',
    order: sequelize.literal('count DESC'),
    limit: 20
  });

  res.json(topTwentyPlaylists);
});

// router.get('/:myPlaylistSongId', async (req, res) => {
//   const myPlaylistSong = await PlaylistSongs.findByPk(req.params.myPlaylistSongId , {
//     include: [{ model: Playlist }, { model: Song }]
//   });
//   res.json(myPlaylistSong)
// })

router.get('/:interactionId', async (req, res) => {
  const interaction = await InteractionPlaylist.findAll({
    include: [{ model: User }, { model: Playlist }],
    where: {userId: req.params.interactionId}
  });
  res.json(interaction)
})

router.post('/', async (req, res) => {
    const { userId, playlistId, isLiked } = req.body;
    const interaction = await InteractionPlaylist.create({
        userId: userId, 
        playlistId: playlistId, 
        isLiked: isLiked, 
        createdAt: req.body.createdAt || new Date(),
        updatedAt: new Date()
    });
    res.json(interaction)
})

router.patch('/:interactionId', async (req, res) => {
  const interaction = await InteractionPlaylist.findByPk(req.params.interactionId);
  await interaction.update(req.body);
  res.json(interaction)
})

router.delete('/:interactionId', async (req, res) => {
  const interaction = await InteractionPlaylist.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;