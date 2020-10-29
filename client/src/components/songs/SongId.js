import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import YouTube from 'react-youtube';
import Song from './Song';
import './Songs.css'

function SongId(match) {
    console.log(match)
    const [song, setSong] = useState(null);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [playlistID, setPlaylistID] = useState(1);

    useEffect(() => {
        fetchSong();
    }, []);
    useEffect(() => {
        fetchArtist();
    }, []);
    useEffect(() => {
        fetchAlbum();
    }, []);
    useEffect(() => {
        fetchPlaylist();
    }, []);
    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchSong = async(id = match.match.params.id) => {
        const { data } = await axios.get(`/songs/${id}`);
        console.log("data: ", data)
        setSong(data);
    }
    const fetchArtist = async() => {
        if (match.location.search.substring(1, 7) === "artist") {
            console.log("artist search: ", match.location.search.substring(1, 7))
            const { data } = await axios.get(`/artists/${Number(match.location.search.substring(8))}`);
            setArtist(data);
        }
    }
    const fetchAlbum = async() => {
        if (match.location.search.substring(1, 6) === "album") {
            const { data } = await axios.get(`/albums/${Number(match.location.search.substring(7))}`);
            setAlbum(data);
        }
    }
    const fetchPlaylist = async() => {
        if (match.location.search.substring(1, 9) === "playlist") {
            const { data } = await axios.get(`/playlistsongs`);
            const playlistSongs = data.filter((item) => item.PlaylistId === Number(match.location.search.substring(10)) && item.SongId !== Number(match.match.params.id));
            console.log("playlist songs: ", playlistSongs)
            setPlaylist(playlistSongs);
        }
    }
    const fetchPlaylists = async() => {
        const { data } = await axios.get(`/playlists`);
        console.log("data: ", data)
        setPlaylists(data)
        console.log("playlists: ", playlists)
    }
    const addPlaylistID = async() => {
        await setPlaylistID(document.getElementById("mySelect").value);
    }

    const addToPlaylist = async(playlistId, songId) => {
        await axios.post('/playlistsongs', {
            "playlistId": Number(playlistId),
            "songId": songId,
        });
    }

    const renderPage = (songId, playlistId) => {
        fetchSong(songId);
        fetchPlaylist(playlistId);
    };

    const optsForMainSong = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
          },
    }
    const optsForOtherSong = {
        height: '160',
        width: '260',
        // playerVars: {
        //     autoplay: 1,
        //   },
    }

    return (
        <>
        {song && (
            <div className="info">
                <div>Song Title: {song.title}</div>
                <div>
                    <YouTube videoId={song.youtubeLink} opts={optsForMainSong} /> 
                    {/* <iframe src={`https://www.youtube.com/embed/${song.YouTube_Link}`}/> */}
                </div>
                {playlists && (
                    <form onSubmit={() => addToPlaylist(playlistID, song.id)}> Add To Playlist
                        <select id="mySelect" onChange={() => addPlaylistID()}>
                            {playlists.map(playlist => {
                                return (
                                    <option value={playlist.id}>{playlist.id}. {playlist.name}</option>
                                )
                            })}
                        </select>
                        <input id="inputSubmit" type="submit" value="ADD"/>
                    </form>
                )}
                <Link to = {`/artist/${song.artistId}`}>
                    <div className="songLink">Artist Name: {song.Artist.name}</div>
                </Link>
                <Link to = {`/album/${song.albumId}`}>
                    <div className="songLink">Album Name: {song.Album.name}</div>
                </Link>
                <div>Created At: {song.createdAt}</div>
                <div>Updated At: {song.updatedAt}</div>
                <div>Length: {song.length}</div>
                <div>Lyrics: <br />{song.lyrics}</div>
                <>
                    {artist && (
                        <div className="songsFromSameDiv">
                            <h3 className="subHeader">Songs From Artist:</h3>
                            <h4>Artist Name: {artist.name}
                                <Link to = {`/artist/${artist.id}`}>
                                    <div>
                                        Go To Artist - {artist.name}
                                    </div>
                                    <img src={artist.coverImg} />
                                </Link>
                            </h4>
                            <Carousel
                                center
                                infinite
                                showArrows
                                showIndicator
                                slidesToShow={3}>
                                    {artist.Songs.map((song) => {
                                        return (
                                            <div>
                                                <Link to = {`/song/${song.id}?artist=${song.artistId}`}>
                                                    <Song song={song} />
                                                </Link>
                                            </div>
                                        )
                                    })}
                            </Carousel>
                        </div>
                    )}
                </>
                <>
                    {album && (
                        <div>
                            <h3 className="subHeader">Songs From Album:</h3>
                            <h4>Album Name: {album.name}
                                <Link to = {`/album/${album.id}`}>
                                    <div>
                                        Go To Album - {album.name}
                                    </div>
                                    <img src={album.coverImg} />
                                </Link>
                            </h4>
                            <Carousel
                                center
                                infinite
                                showArrows
                                showIndicator
                                slidesToShow={3}>
                                    {album.Songs.map((song) => {
                                        return (
                                            <div>
                                                <Link to = {`/song/${song.id}?album=${song.albumId}`}>
                                                    <Song song={song} />
                                                </Link>
                                            </div>
                                        )
                                    })}
                            </Carousel>
                        </div>
                    )}
                </>
                <>
                    {playlist && (
                        <div>
                            <h3 className="subHeader">Songs From Same Playlist:</h3>
                            <h4>Playlist Name: {playlist[0].Playlist.Name}
                                <Link to = {`/playlist/${playlist[0].PlaylistId}`}>
                                    <div>
                                        Go To Playlist - {playlist[0].Playlist.Name}
                                    </div>
                                    <img src={playlist[0].Playlist.Cover_img} />
                                </Link>
                            </h4>
                            <Carousel
                                center
                                infinite
                                showArrows
                                showIndicator
                                slidesToShow={3}>
                                    {playlist.map((song) => {
                                        return (
                                            <div onClick={() => {renderPage(song.SongId, song.PlaylistId)}}>
                                                <Link to = {`/song/${song.SongId}?playlist=${song.PlaylistId}`}>
                                                    <Song song={song} />
                                                </Link>
                                            </div>
                                        )
                                    })}
                            </Carousel>
                        </div>
                    )}
                </>
                
            </div>
        )}
        </>
    )
}

export default SongId