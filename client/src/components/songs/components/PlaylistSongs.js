import React from 'react';

// packages
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';

// components
import Song from '../../songs/Song';

function PlaylistSongs({ playlist, renderPage }) {
    return (
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
    )
}

export default PlaylistSongs;
