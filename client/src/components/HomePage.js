import React, { useState, useEffect, useCallback } from 'react';
import './HomePage.css';

// packages
import axios from 'axios';

// components
import TopSongs from './songs/TopSongs';
import TopArtists from './artists/TopArtists';
import TopAlbums from './albums/TopAlbums';
import TopPlaylists from './playlists/TopPlaylists';

function HomePage() {

    const [topOption, setTopOption] = useState("like");
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const songsData = await axios.get('/api/songs/top');
                setSongs(songsData.data);
                songsData.data && setTopSongs(songsData.data[0])
                const artistsData = await axios.get('/api/artists/top');
                setArtists(artistsData.data);
                artistsData.data && setTopArtists(artistsData.data[0])
                const albumsData = await axios.get('/api/albums/top');
                setAlbums(albumsData.data);
                albumsData.data && setTopAlbums(albumsData.data[0]);
                const playlistsData = await axios.get('/api/playlists/top');
                setPlaylists(playlistsData.data)
                console.log(playlistsData.data)
                playlistsData.data && setTopPlaylists(playlistsData.data[0]);
            }
            catch (err) {
                console.error(err.message);
            }
        })()
    }, [])

    const setTop = useCallback((option) => {

        setTopOption(option);
        // style
        if (option === "like") {
            setTopSongs(songs[0])
            setTopArtists(artists[0])
            setTopAlbums(albums[0])
            setTopPlaylists(playlists[0])

            document.getElementById(option).setAttribute("class", "chosen");
            const play = document.getElementById("play");
            if (play.classList.contains("chosen")) play.classList.remove("chosen");
            const newEl = document.getElementById("new");
            if (newEl.classList.contains("chosen")) newEl.classList.remove("chosen");
        }
        if (option === "play") {
            setTopSongs(songs[1])
            setTopArtists(artists[1])
            setTopAlbums(albums[1])
            setTopPlaylists(playlists[1])

            document.getElementById(option).setAttribute("class", "chosen");
            const like = document.getElementById("like");
            if (like.classList.contains("chosen")) like.classList.remove("chosen");
            const newEl = document.getElementById("new");
            if (newEl.classList.contains("chosen")) newEl.classList.remove("chosen");
        }
        if (option === "new") {
            setTopSongs(songs[2])
            setTopArtists(artists[2])
            setTopAlbums(albums[2])
            setTopPlaylists(playlists[2])

            document.getElementById(option).setAttribute("class", "chosen");
            const like = document.getElementById("like");
            if (like.classList.contains("chosen")) like.classList.remove("chosen");
            const play = document.getElementById("play");
            if (play.classList.contains("chosen")) play.classList.remove("chosen");
        }
    }, [topOption])


    return (
        <div className="homepage">

            <div className="topTitles">
                <h2 id="like" className="chosen" onClick={() => setTop("like")}>Top Liked</h2>
                <h2 id="play" onClick={() => setTop("play")}>Top Played</h2>
                <h2 id="new" onClick={() => setTop("new")}>Newest</h2>
            </div>


            { topSongs ? (
                topSongs.length > 0 ? <TopSongs topSongs={topSongs} topOption={topOption} /> : null
            ) : (null)}

            { topArtists ? (
                topArtists.length > 0 ? <TopArtists topArtists={topArtists} topOption={topOption} /> : null
            ) : (null)}

            { topAlbums ? (
                topAlbums.length > 0 ? <TopAlbums topAlbums={topAlbums} topOption={topOption} /> : null
            ) : (null)}

            { topPlaylists ? (
                topPlaylists.length > 0 ? <TopPlaylists topPlaylists={topPlaylists} topOption={topOption} /> : null
            ) : (null)}

        </div>
    )
}

export default HomePage