import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';
import Artist from '../artists/Artist';
import Album from '../albums/Album';
import Playlist from '../playlists/Playlist';

function UserId(match) {
    const [user, setUser] = useState(null);
    console.log("match:", match);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async() => {
        const id = Number(match.match.params.id);
        const { data } = await axios.get(`/users/${id}`);
        setUser(data);
        console.log("data", data);
    }

    return (
        <>
        {user && (
            <div className="info">
                <div>User Name: {user.name}</div>
                <div>Created At: {user.createdAt}</div>
                <div>Updated At: {user.updatedAt}</div>
                <div className="songsOnUserDiv">
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
                <div className="artistsOnUserDiv">
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
                <div className="albumsOnUserDiv">
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
                <div className="playlistsOnUserDiv">
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