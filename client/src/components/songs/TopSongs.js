import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Song from './Song';
import { Link } from 'react-router-dom';
import './Songs.css';

function TopSongs() {
    const [songs, setSongs] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/songs');
            console.log("data: ", data)
            setSongs(data);
            }
            catch(err) {
                console.log(err.massage);
            }
        })()
    }, [])

    return (
        <div className="topSongs">
            <div className="topHeader">Top Songs</div>
            <Carousel         
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={3}>
                {songs.map(song => {
                    return (
                        <Link to = {`/song/${song.id}`}>
                            <Song song={song} />
                        </Link>
                    )                  
                })} 
            </Carousel>
        </div>   
    )
}

export default TopSongs;