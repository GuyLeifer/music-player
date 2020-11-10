import React, { useEffect, useState } from 'react';
import './Songs.css';

// packages
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import Song from './Song';

function TopSongs({ topOption }) {

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        topOption === "like" ? (
            (async () => {
                try {
                const { data } = await axios.get('/interactions/songs/topsongs');
                setSongs(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        ) : (
            (async () => {
                try {
                const { data } = await axios.get(`/songs/top/${topOption}`);
                setSongs(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        )
    }, [topOption])

    return (
        <div className="topSongs">
            <div className="topHeader">Top Songs</div>
            {topOption === "like" ? (
                <Carousel         
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                    {songs.map(interaction => {
                        return (
                            <Link to = {`/song/${interaction.songId}`} key={interaction.songId}>
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
                    {songs.map(song => {
                        return (
                            <Link to = {`/song/${song.id}`} key={song.id}>
                                <Song song={song} />
                            </Link>
                        )                  
                    })} 
                </Carousel>
            )}
        </div>   
    )
}

export default TopSongs;