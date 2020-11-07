import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';
import Artist from '../artists/Artist';
import Album from '../albums/Album';
import Playlist from '../playlists/Playlist';

function UserId(match) {
    const [user, setUser] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState();

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchUserPlaylists();
    }, [user]);

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
                        <h3 className="subHeader">My Playlists:</h3>
                        {userPlaylists.map(playlist => {
                            return (
                                <Link to={`/playlist/${playlist.id}`}>
                                    <p className="playlistLink">{playlist.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                )}

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
            </div>
        )}
        </>
    )
}

export default UserId