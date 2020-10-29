import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';

function PlaylistId(match) {
    const [playlist, setPlaylist] = useState(null);
    console.log("match:", match);

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async() => {
        const { data } = await axios.get(`/playlistsongs/${match.match.params.id}`);
        setPlaylist(data);
        console.log("data", data);
    }

    const opts = {
        height: '160',
        width: '260',
    }

    return (
        <>
        {playlist && (
            <div className="info">
                <div>Playlist Name: {playlist[0].Playlist.name}</div>
                <div>Created At: {playlist[0].Playlist.createdAt}</div>
                <div>Updated At: {playlist[0].Playlist.updatedAt}</div>
                <div>
                    <h3>Cover Image:</h3>
                    <img src={playlist[0].Playlist.coverImg}/>
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
        )}
        </>
    )
}

export default PlaylistId