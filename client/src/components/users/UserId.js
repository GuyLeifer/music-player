import React, { useEffect, useState } from 'react';
import './User.css';

//packages
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import { useForm } from 'react-hook-form';

// components
import Song from '../songs/Song';
import Artist from '../artists/Artist';
import Album from '../albums/Album';
import Playlist from '../playlists/Playlist';

// icons
import deleteIcon from './images/deleteIcon.png';

// recoil
import { useRecoilState } from "recoil";
import { userState } from '../../Atoms/userState';

function UserId(match) {

    const [username, setUsername] = useRecoilState(userState);
    const [user, setUser] = useState();
    const [userPlaylists, setUserPlaylists] = useState();
    const [newPlaylist, setNewPlaylist] = useState(false);

    const { register, handleSubmit, errors } = useForm(); // initialize the hook

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchUserPlaylists();
    }, [user, newPlaylist]);

    const fetchUser = async() => {
        const id = Number(match.match.params.id);
        const { data } = await axios.get(`/users/${id}`);
        setUser(data);
    };

    const fetchUserPlaylists = async () => {
        if (user) {
            const { data } = await axios.get(`/users/playlists/${user.id}`)
            setUserPlaylists(data.Playlist || data.Playlists)
        }
    };

    const deleteUser = async () => {
        axios.delete(`/users/${user.id}`);
        window.location.assign('/');
    }

    const createPlaylist = async (data) => {
        const { name, coverImg } = data;
        await axios.post('/playlists/', {
            userId: username.id,
            name: name,
            coverImg: coverImg
        });
        setNewPlaylist(false);
    }

    return (
        <>
        {user && (
            <div className="info">
                <div className="title">User Name: {user.name}</div>
                <div>Created At: {user.createdAt}</div>
                <div>Updated At: {user.updatedAt}</div>
                <a href="#songsOnUserDiv" className="insideLink">Songs Liked By User</a>
                <a href="#artistsOnUserDiv" className="insideLink">Artists Liked By User</a>
                <a href="#albumsOnUserDiv" className="insideLink">Albums Liked By User</a>
                <a href="#playlistsOnUserDiv" className="insideLink">Playlists Liked By User</a>


                {userPlaylists && (
                    <div className="userPlaylists">
                        {username.id === Number(match.match.params.id) ? <h3 className="subHeader">My Playlists:</h3> : <h3 className="subHeader">User Playlists:</h3>}
                        {userPlaylists.map(playlist => {
                            return (
                                <Link to={`/playlist/${playlist.id}?user=${user.id}`}>
                                    <p className="playlistLink">{playlist.name}</p>
                                </Link>
                            )
                        })}
                        {username.id === Number(match.match.params.id) ? <p className="newPlaylist" onClick={() => setNewPlaylist(!newPlaylist)}>Create a New Playlist:</p> : null}
                        {newPlaylist && (
                            <div>
                                <form className="accountForm" onSubmit={handleSubmit(createPlaylist)}>
                                    <div className="labelInput">
                                        <label htmlFor="name">Playlist Name:</label>
                                        <input className="input" name="name" ref={register({ required: true })} placeholder="Name"/>
                                        <div className="error">{errors.email && 'Name is required.'}</div>
                                    </div>
                                    <div className="labelInput">
                                        <label htmlFor="coverImg">Cover Image:</label>
                                        <input className="input" name="coverImg" ref={register({ required: true })} placeholder="Image Link"/>
                                        <div className="error">{errors.email && 'Cover Image is required.'}</div>
                                    </div>
                                    <input className="input" type="submit" value="Create Playlist"/>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {user.InteractionSongs && (
                    <div id="songsOnUserDiv" className="songsOnUserDiv">
                        <h3 className="subHeader">Songs Liked By User:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                            {user.InteractionSongs.map((interaction) => {
                                return (
                                    <Link to={`/song/${interaction.SongId}?user=${interaction.UserId}`}> 
                                        <Song song={interaction.Song} />
                                    </Link> 
                                )
                            })}
                        </Carousel>
                    </div>
                )}

                {user.InteractionArtists && (
                    <div id="artistsOnUserDiv" className="artistsOnUserDiv">
                        <h3 className="subHeader">Artists Liked By User:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                            {user.InteractionArtists.map((interaction) => {
                                return (
                                    <Link to={`/artist/${interaction.ArtistId}?user=${interaction.UserId}`}> 
                                        <Artist artist={interaction.Artist} />
                                    </Link> 
                                )
                            })}
                        </Carousel>
                    </div>
                )}

                {user.InteractionAlbums && (
                    <div id="albumsOnUserDiv" className="albumsOnUserDiv">
                        <h3 className="subHeader">Albums Liked By User:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                            {user.InteractionAlbums.map((interaction) => {
                                return (
                                    <Link to={`/album/${interaction.AlbumId}?user=${interaction.UserId}`}> 
                                        <Album album={interaction.Album} />
                                    </Link> 
                                )
                            })}
                        </Carousel>
                    </div>
                )}

                {user.InteractionPlaylists && (
                    <div id="playlistsOnUserDiv" className="playlistsOnUserDiv">
                        <h3 className="subHeader">Playlists Liked By User:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                            {user.InteractionPlaylists.map((interaction) => {
                                return (
                                    <Link to={`/playlist/${interaction.PlaylistId}?user=${interaction.UserId}`}> 
                                        <Playlist playlist={interaction.Playlist} />
                                    </Link> 
                                )
                            })}
                        </Carousel>
                    </div>
                )}
            </div>
        )}

        {username.id === Number(match.match.params.id) && (
            <div className="deleteDiv">
                <p className="deleteP">Delete Account</p>
                <img className="deletePlaylistIcon" src={deleteIcon} alt="Delete Playlist" onClick={() => deleteUser()}/>
            </div>
        )}
        </>
    )
}

export default UserId