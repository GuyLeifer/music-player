import React, { useEffect, useState } from 'react';
import './Playlists.css';

// packages
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import Playlist from './Playlist';

function TopPlaylists( { topPlaylists, topOption }) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setPlaylists(topPlaylists)
    })
    
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
                            <Link to = {`/playlist/${playlist.id}`} key={playlist.id}>
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
                                <Playlist playlist={playlist.Playlist} key={playlist.playlistId}/>
                            </Link>
                        ) 
                    })}
                </Carousel>       
            )}  
        </div>
    )
}

export default TopPlaylists;