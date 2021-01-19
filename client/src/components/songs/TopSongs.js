import React from 'react';
import './Songs.css';

// packages
import Carousel from 'styled-components-carousel';
import { Link } from 'react-router-dom';

// components
import Song from './Song';

function TopSongs({ topSongs, topOption }) {

    return (
        <div className="topSongs">
            <div className="topHeader">Top Songs</div>
            {topSongs.length > 0 && (
                <div>
                    {topOption === "like" ? (
                        <Carousel
                            center
                            infinite
                            showArrows
                            showIndicator
                            slidesToShow={3}>
                            {topSongs.map(interaction => {
                                return (
                                    <Link to={`/song/${interaction.songId}`} key={interaction.songId}>
                                        <Song song={interaction.Song} />
                                    </Link>
                                )
                            })}
                        </Carousel>
                    ) : (
                            <Carousel
                                center
                                infinite
                                showArrows
                                showIndicator
                                slidesToShow={3}>
                                {topSongs.map(song => {
                                    return (
                                        <Link to={`/song/${song.id}`} key={song.id}>
                                            <Song song={song} />
                                        </Link>
                                    )
                                })}
                            </Carousel>
                        )}
                </div>
            )}
        </div>
    )
}

export default TopSongs;