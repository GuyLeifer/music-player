import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';

function PlaylistId(match) {

    const [playlist, setPlaylist] = useState(null);
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchPlaylist();
        fetchUser();
    }, []);

    useEffect(() => {
        fetchIsLiked();
    }, [user, playlist]);

    const fetchPlaylist = async() => {
        const { data } = await axios.get(`/playlistsongs/${match.match.params.id}`);
        setPlaylist(data);
        console.log("data", data);
    }
    const fetchUser = async () => {
        const { data } = await axios.get('/users/verify');
        if(data.user) {
            console.log("User", data.user)
            setUser(data.user);
        } else {
            setUser(false);
        }   
    };
    const fetchIsLiked = async () => {
        if (user && playlist) {
            const { data } = await axios.get(`/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`);
            setIsLiked(data.isLiked);
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likePlaylist = async () => {
        const data = await axios.get(`/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        } else {
            await axios.post('/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikePlaylist = async () => {
        const data = await axios.get(`/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        } else {
            await axios.post('/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    return (
        <>
        {playlist && (
            <div className="info">
                <div className="title">Playlist Name: {playlist[0].Playlist.name}</div>
                {user && (
                    <div>
                        {!isLiked && (
                            <img className="likeIcon" onClick={() => likePlaylist()} src="https://cdn.iconscout.com/icon/free/png-256/like-1767386-1505250.png" alt="Like"/>
                        )}
                        {isLiked && (
                            <img className="unlikeIcon" onClick={() => unlikePlaylist()} src="https://cdn.iconscout.com/icon/free/png-256/like-1767386-1505250.png" alt="Unlike"/>
                        )}
                    </div>
                )}
                <div className="playlistContainer">
                    <div>
                        <div>
                            <h3>Cover Image:</h3>
                            <img src={playlist[0].Playlist.coverImg} alt={playlist[0].Playlist.name}/>
                        </div>
                        <div>Created At: {playlist[0].Playlist.createdAt}</div>
                        <div>Updated At: {playlist[0].Playlist.updatedAt}</div>
                    </div>
                    <div className="songsOnPlaylistDiv">
                        <h3 className="subHeader">Songs:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                            {playlist.map((item) => {
                                return (
                                    <Link to={`/song/${item.SongId}?playlist=${item.PlaylistId}`}> 
                                        <Song song={item.Song} />
                                    </Link> 
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
                <div>
                            <h3>All Playlist Songs:</h3>
                                {playlist.map((song) => {
                                    return (
                                        <Link to={`/song/${song.Song.id}?playlist=${song.Playlist.id}`}>
                                            <p>{song.Song.title}</p>
                                        </Link>
                                    )
                                })}
                        </div>
            </div>
        )}
        </>
    )
}

export default PlaylistId