import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';
import deleteIcon from './images/deleteIcon.png';
import likeIcon from '../images/likeIcon.webp';

function PlaylistId(match) {

    const [playlist, setPlaylist] = useState();
    const [emptyPlaylist, setEmptyPlaylist] = useState();
    const [user, setUser] = useState();
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchPlaylist();
        fetchUser();
    }, []);

    useEffect(() => {
        fetchIsLiked();
    }, [user, playlist]);

    const fetchPlaylist = async () => {
        const { data } = await axios.get(`/api/playlistsongs/${match.match.params.id}`);
        if (data.length > 0) {
            setPlaylist(data);
        } else {
            const playlistIsEmpty = await axios.get(`/api/playlists/${match.match.params.id}`)
            setEmptyPlaylist(playlistIsEmpty.data);
        }
    }
    const fetchUser = async () => {
        const { data } = await axios.get('/api/users/verify');
        if (data.user) {
            setUser(data.user);
        } else {
            setUser(false);
        }
    };
    const fetchIsLiked = async () => {
        if (user && playlist) {
            const { data } = await axios.get(`/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likePlaylist = async () => {
        const { data } = await axios.get(`/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        } else {
            await axios.post('/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikePlaylist = async () => {
        const data = await axios.get(`/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        } else {
            await axios.post('/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    const deleteSongFromPlaylist = async (id) => {
        await axios.delete('/api/playlistsongs', {
            data: {
                playlistId: playlist[0].Playlist.id,
                songId: id
            }
        })
        const refreshPlaylist = playlist.filter(song => song.Song.id !== id);
        if (refreshPlaylist.length < 1) {
            setPlaylist(null);
            fetchPlaylist();
        } else {
            setPlaylist(refreshPlaylist);
        }
    }

    const deletePlaylist = async () => {
        if (playlist) {
            const id = playlist[0].Playlist.id;
            const { data } = await axios.delete('/api/playlists', {
                data: {
                    playlistId: id
                }
            });
            await axios.delete(`/api/elasticsearch/playlists/${id}`);

            setPlaylist(null);
            window.location.assign('/');
        } else if (emptyPlaylist) {
            const id = emptyPlaylist.id;
            await axios.delete('/api/playlists', {
                data: {
                    playlistId: id
                }
            });
            await axios.delete(`/api/elasticsearch/playlists/${id}`);
            window.location.assign('/');
        }
    }

    return (
        <>
            {playlist && (
                <div className="info">
                    <div className="title">Playlist Name: {playlist[0].Playlist.name}</div>
                    {user && (
                        <div className="iconsDiv">
                            <div>
                                {!isLiked && (
                                    <img className="likeIcon" onClick={() => likePlaylist()} src={likeIcon} alt="Like" />
                                )}
                                {isLiked && (
                                    <img className="unlikeIcon" onClick={() => unlikePlaylist()} src={likeIcon} alt="Unlike" />
                                )}
                            </div>
                            { ((playlist) && (user.id === playlist[0].Playlist.userId)) &&
                                <div>
                                    <img className="deletePlaylistIcon" src={deleteIcon} alt="Delete Playlist" onClick={() => deletePlaylist()} />
                                </div>
                            }
                        </div>
                    )}
                    <div className="playlistContainer">
                        <div>
                            <div>
                                <h3>Cover Image:</h3>
                                <img src={playlist[0].Playlist.coverImg} alt={playlist[0].Playlist.name} />
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
                                <div>
                                    <Link to={`/song/${song.SongId}?playlist=${song.PlaylistId}`}>
                                        <p className="playlistNameLink">{song.Song.title}</p>
                                    </Link>
                                    { (user) && user.id === playlist[0].Playlist.userId && (
                                        <img className="deleteIcon" src={deleteIcon} alt="Delete" onClick={() => deleteSongFromPlaylist(song.Song.id)} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            {emptyPlaylist && (
                <div className="info">
                    <div className="title">Playlist Name: {emptyPlaylist.name}</div>
                    {user && (
                        <div className="iconsDiv">
                            <div>
                                {!isLiked && (
                                    <img className="likeIcon" onClick={() => likePlaylist()} src={likeIcon} alt="Like" />
                                )}
                                {isLiked && (
                                    <img className="unlikeIcon" onClick={() => unlikePlaylist()} src={likeIcon} alt="Unlike" />
                                )}
                            </div>
                            { ((emptyPlaylist) && (user.id === emptyPlaylist.userId)) &&
                                <div>
                                    <img className="deletePlaylistIcon" src={deleteIcon} alt="Delete Playlist" onClick={() => deletePlaylist()} />
                                </div>
                            }
                        </div>
                    )}
                    <div>
                        <div>
                            <h3>Cover Image:</h3>
                            <img src={emptyPlaylist.coverImg} alt={emptyPlaylist.name} />
                        </div>
                        <div>Created At: {emptyPlaylist.createdAt}</div>
                        <div>Updated At: {emptyPlaylist.updatedAt}</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlaylistId