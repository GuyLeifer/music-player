import React, { useEffect, useState } from 'react';
import './Playlists.css';

// packages
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import Playlist from './Playlist';

function TopPlaylists( { topOption }) {
    const [playlists, setPlaylists] = useState([]);
    
    useEffect(() => {
        topOption === "like" ? (
            (async () => {
                try {
                const { data } = await axios.get('/interactions/playlists/topplaylists');
                setPlaylists(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        ) : (
            (async () => {
                try {
                const { data } = await axios.get(`/playlists/top/${topOption}`);
                setPlaylists(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        )
    }, [topOption])

    return (
        <div className="topPlaylists">
            <div className="topHeader">Top Playlists</div>
            {topOption === "new" ? (
                <Carousel         
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                    {playlists.map(playlist => {
                        return (
                            <Link to = {`/artist/${playlist.id}`} key={playlist.id}>
                                <Playlist playlist={playlist} />
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
                    {playlists.map(playlist => {
                        return (
                            <Link to = {`/playlist/${playlist.playlistId}`} key={playlist.playlistId}>
                                <Playlist playlist={playlist.Playlist} />
                            </Link>
                        ) 
                    })}
                </Carousel>       
            )}  
        </div>
    )
}

export default TopPlaylists;