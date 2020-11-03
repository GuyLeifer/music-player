const { Router } = require('express');

const router = Router();

router.use('/songs', require('./interactions/interactionSongsRoute'));
router.use('/albums', require('./interactions/interactionAlbumsRoute'));
router.use('/artists', require('./interactions/interactionArtistsRoute'));
router.use('/playlists', require('./interactions/interactionPlaylistsRoute'));
// router.use('/playlistsongs', require('./interactions/interactionPlaylistSongsRoute'));

module.exports = router;