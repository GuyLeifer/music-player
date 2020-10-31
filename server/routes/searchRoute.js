const { Router } = require('express');
const { Album, Song, Artist, Playlist, PlaylistSongs } = require('../models');
const { Op } = require("sequelize");

const router = Router();

router.get('/', async (req, res) => {

    const allSongs = await Song.findAll({
        where: {
            title: {
                [Op.startsWith]: req.query.params
            }
        }
    });
    const allArtists = await Artist.findAll({
        where: {
            name: {
                [Op.startsWith]: req.query.params
            }
        }
    });
    const allAlbums = await Album.findAll({
        where: {
            name: {
                [Op.startsWith]: req.query.params
            }
        }
    });
    const allPlaylists = await Playlist.findAll({
        where: {
            name: {
                [Op.startsWith]: req.query.params
            }
        }
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

})

router.get('/all', async (req, res) => { 
    const allSongs = await Song.findAll({
    });
    const allArtists = await Artist.findAll({
    });
    const allAlbums = await Album.findAll({
    });
    const allPlaylists = await Playlist.findAll({
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
});

module.exports = router;