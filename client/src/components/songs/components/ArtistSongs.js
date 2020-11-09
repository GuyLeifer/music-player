import React from 'react';

// packages
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';

// components
import Song from '../../songs/Song';

function ArtistSongs({ artist, renderPage }) {
    return (
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
    )
}

export default ArtistSongs;
