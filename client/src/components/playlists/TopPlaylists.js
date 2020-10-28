import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Playlist from './Playlist';
import './Playlists.css';

function TopPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/playlists');
            setPlaylists(data);
            }
            catch(err) {
                console.log(err.massage);
            }
        })()
    }, [])

    return (
        <div className="topPlaylists">
            <div className="topHeader">Top Playlists</div>
            <Carousel         
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={3}>
                {playlists.map(playlist => {
                    return <Playlist playlist={playlist} />
                })}
            </Carousel>    
        </div>
    )
}

export default TopPlaylists;