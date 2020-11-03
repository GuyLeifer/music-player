import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Playlist from './Playlist';
import { Link } from 'react-router-dom';
import './Playlists.css';

function TopPlaylists() {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/interactions/playlists/topplaylists');
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
                {playlists.map(interaction => {
                    return (
                        <Link to = {`/playlist/${interaction.playlistId}`}>
                            <Playlist playlist={interaction.Playlist} />
                        </Link>
                    ) 
                })}
            </Carousel>    
        </div>
    )
}

export default TopPlaylists;