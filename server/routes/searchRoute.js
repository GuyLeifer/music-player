const { Router } = require('express');
const { Album, Song, Artist, Playlist, PlaylistSongs } = require('../models');
const { Op } = require("sequelize");
const { updateElasticData } = require('./elasticSearch');

const router = Router();

router.post('/all', async (req, res) => {
    const artists  = await Artist.findAll({
    });
    const result = updateElasticData('artists', artists);
    res.send(result)
})
router.get("/songs", async (req, res) => {
    try {
        const { body: count1 } = await client.count({ index: "music_player" });
        console.log(("hibro", count1));
        const allSongs = await Song.findAll({
        include: [
            {
                model: Artist,
                attributes: ["name"],
            },
            {
                model: Album,
                attributes: ["name"],
            },
        ],
    });
    const body = allSongs.flatMap((doc) => [
        { index: { _index: "spotify" } },
        doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    if (bulkResponse.errors) {
        return res.json(bulkResponse.errors);
    }
    const { body: count } = await client.count({ index: "spotify" });
    res.send(count);
    } catch (e) {
        res.json({ error: e.message });
    }
});

router.get('/', async (req, res) => {
    if (req.query.params === "") {
        res.send(null);
    } else {
        const allSongs = await Song.findAll({
            where: {
                title: {
                    [Op.startsWith]: req.query.params
                }
            },
            limit: 3
        });
        const allArtists = await Artist.findAll({
            where: {
                name: {
                    [Op.startsWith]: req.query.params
                }
            },
            limit: 3
        });
        const allAlbums = await Album.findAll({
            where: {
                name: {
                    [Op.startsWith]: req.query.params
                }
            },
            limit: 3
        });
        const allPlaylists = await Playlist.findAll({
            where: {
                name: {
                    [Op.startsWith]: req.query.params
                }
            },
            limit: 3
        });
    
        const songs = allSongs.map(song => {return ({ id: song.id, value: song.title, type: "song" }) })
        const artists = allArtists.map(artist => {return ({ id: artist.id, value: artist.name, type: "artist" }) })
        const albums = allAlbums.map(album => {return ({ id: album.id, value: album.name, type: "album" }) })
        const playlists = allPlaylists.map(playlist => {return ({ id: playlist.id, value: playlist.name, type: "playlist" }) })
    
        const arr = [];
        songs.forEach(song => {arr.push(song)});
        artists.forEach(artist => {arr.push(artist)});
        albums.forEach(album => {arr.push(album)});
        playlists.forEach(playlist => {arr.push(playlist)});
    
        res.send(arr);
    }
})

// router.get('/all', async (req, res) => { 
//     const allSongs = await Song.findAll({
//     });
//     const allArtists = await Artist.findAll({
//     });
//     const allAlbums = await Album.findAll({
//     });
//     const allPlaylists = await Playlist.findAll({
//     });

//     const songs = allSongs.map(song => {return ({ id: song.id, value: song.title, type: "song" }) })
//     const artists = allArtists.map(artist => {return ({ id: artist.id, value: artist.name, type: "artist" }) })
//     const albums = allAlbums.map(album => {return ({ id: album.id, value: album.name, type: "album" }) })
//     const playlists = allPlaylists.map(playlist => {return ({ id: playlist.id, value: playlist.name, type: "playlist" }) })

//     const arr = [];
//     songs.forEach(song => {arr.push(song)});
//     artists.forEach(artist => {arr.push(artist)});
//     albums.forEach(album => {arr.push(album)});
//     playlists.forEach(playlist => {arr.push(playlist)});

//     res.send(arr);
// });

module.exports = router;