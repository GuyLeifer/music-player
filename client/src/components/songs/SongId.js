import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import YouTube from 'react-youtube';
import Song from './Song';
import './Songs.css';
import likeIcon from '../images/likeIcon.webp';

function SongId(match) {
    const [song, setSong] = useState(null);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [playlistID, setPlaylistID] = useState(1);
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState();
    const [playCount, setPlayCount] = useState();

    useEffect(() => {
        fetchSong(match.match.params.id, match);
        fetchPlaylist(match);
        fetchUser();
    }, []);

    useEffect(() => {
        fetchIsLikedAndIncrementPlayCount();
    }, [user, song]);

    useEffect(() => {
        fetchPlaylists();
    }, [user])

    const fetchUser = async () => {
        const { data } = await axios.get('/users/verify');
        if(data.user) {
            console.log("User", data.user)
            setUser(data.user);
        } else {
            setUser(false);
        }   
    };
    const fetchIsLikedAndIncrementPlayCount = async () => {
        if (user && song) {
            console.log("user id", user.id, "song id", song.id)
            const { data } = await axios.get(`/interactions/songs/${user.id}&${song.id}`);
            if (data) {
                console.log("data", data)
                setIsLiked(data.isLiked);
                if(data.playCount === null) {
                    setPlayCount(1);
                    axios.patch('/interactions/songs/', {
                        userId: user.id, 
                        songId: song.id,
                        playCount: 1
                    })
                } else {
                    setPlayCount(data.playCount + 1);
                    axios.patch('/interactions/songs/', {
                        userId: user.id, 
                        songId: song.id,
                        playCount: data.playCount + 1
                    })
                }
            } else {
                setIsLiked(false);
                setPlayCount(1);
                    axios.post('/interactions/songs/', {
                        userId: user.id, 
                        songId: song.id,
                        playCount: 1
                    })
            }
        } else {
            setIsLiked(null)
        }
    };

    const fetchSong = async(id, match) => {
        console.log("match : " , match)
        const { data } = await axios.get(`/songs/${id}`);
        setSong(data);
        if (match.location.search.substring(1, 7) === "artist") setArtist(data.Artist);
        if (match.location.search.substring(1, 6) === "album") setAlbum(data.Album);
        if (match.location.search.substring(1, 9) === "playlist") {
            const { data } = await axios.get(`/playlistsongs`);
            const playlistSongs = data.filter((item) => item.PlaylistId === Number(match.location.search.substring(10)) && item.SongId !== Number(match.match.params.id));
            console.log("playlist songs: ", playlistSongs)
            setPlaylist(playlistSongs);
        }
    }
    const fetchPlaylist = async(match) => {
        if (match.location.search.substring(1, 9) === "playlist") {
            const { data } = await axios.get(`/playlistsongs/${match.location.search.substring(10)}&${match.match.params.id}`);
            // const playlistSongs = data.filter((item) => item.PlaylistId === Number(match.location.search.substring(10)) && item.SongId !== Number(match.match.params.id));
            console.log("playlist songs: ", data);
            setPlaylist(data);
        }
    }
    const fetchPlaylists = async() => {
        if (user) {
            const { data } = await axios.get(`/users/playlists/${user.id}`);
            console.log("data: ", data)
            setPlaylists(data.Playlist || data.Playlists)
            console.log("playlists: ", playlists)
        } else {
            setPlaylists(null);
        }
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

    const renderPage = async (id) => {
        const { data } = await axios.get(`/songs/${id}`);
        setSong(data);
        window.scrollTo(0, 0);
    };

    const optsForMainSong = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    }

    const likeSong = async () => {
        const { data } = await axios.get(`/interactions/songs/${user.id}&${song.id}`);
        if (data) {
            await axios.patch('/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: true
            })
        } else {
            await axios.post('/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeSong = async () => {
        const data = await axios.get(`/interactions/songs/${user.id}&${song.id}`)
        if (data) {
            await axios.patch('/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: false
            })
        } else {
            await axios.post('/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    return (
        <>
        {song && (
            <div className="info">
                <div className="title">Song Title: {song.title}</div>
                {user && (
                    <div>
                        {playCount && (
                            <p className="playCount">Play Count Of The Song In Your Account: <span className="count">{playCount}</span></p>
                        )}
                        {!isLiked && (
                            <img className="likeIcon" onClick={() => likeSong()} src={likeIcon} alt="Like"/>
                        )}
                        {isLiked && (
                            <img className="unlikeIcon" onClick={() => unlikeSong()} src={likeIcon} alt="Unlike"/>
                        )}
                    </div>
                )}
                <div className="songContainer">
                    <div>
                        <YouTube videoId={song.youtubeLink} opts={optsForMainSong} /> 
                    </div>
                    <div>
                        {playlists && (
                            <form onSubmit={() => addToPlaylist(playlistID, song.id)}> Add To Your Playlist/s
                                <select id="mySelect" onChange={() => addPlaylistID()}>
                                    {playlists.map(playlist => {
                                        return (
                                            <option value={playlist.id}>{playlist.name}</option>
                                        )
                                    })}
                                </select>
                                <input id="inputSubmit" type="submit" value="ADD"/>
                            </form>
                        )}
                        <Link to = {`/artist/${song.artistId}?song=${song.id}`}>
                            <div className="songLink">Artist Name: {song.Artist.name}</div>
                        </Link>
                        <Link to = {`/album/${song.albumId}?song=${song.id}`}>
                            <div className="songLink">Album Name: {song.Album.name}</div>
                        </Link>
                        <div>Created At: {song.createdAt}</div>
                        <div>Updated At: {song.updatedAt}</div>
                        <div>Length: {song.length}</div>
                    </div>
                </div>
                <div className="lyrics">
                    <h3>Lyrics:</h3>
                    <div>{song.lyrics}</div>
                </div>
                <>
                    {artist && (
                        <div className="songsFromSameDiv">
                            <h3 className="subHeader">Songs From Artist:</h3>
                            <h4>Artist Name: {artist.name}
                                <Link to = {`/artist/${artist.id}`}>
                                    <div>
                                        Go To Artist Page - {artist.name}
                                    </div>
                                    <img src={artist.coverImg} alt={artist.name}/>
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
                                            <div onClick={() => renderPage(song.id)}>
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
                                        Go To Album Page - {album.name}
                                    </div>
                                    <img src={album.coverImg} alt={album.name}/>
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
                                            <div onClick={() => renderPage(song.id)}>
                                                <Link to={`/song/${song.id}?album=${song.albumId}`}>
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
                            <h4>Playlist Name: {playlist[0].Playlist.name}
                                <Link to = {`/playlist/${playlist[0].PlaylistId}`}>
                                    <div>
                                        Go To Playlist Page - {playlist[0].Playlist.name}
                                    </div>
                                    <img src={playlist[0].Playlist.coverImg} alt={playlist[0].Playlist.name}/>
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
                                            <div onClick={() => renderPage(song.id)}>
                                                <Link to = {`/song/${song.SongId}?playlist=${song.PlaylistId}`}>
                                                    <Song song={song.Song} />
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