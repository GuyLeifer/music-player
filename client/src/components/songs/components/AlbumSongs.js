import React from 'react';

// packages
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';

// components
import Song from '../../songs/Song';

function AlbumSongs({ album, renderPage }) {
    return (
        <div className="songsFromSameDiv">
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
    )
}

export default AlbumSongs;