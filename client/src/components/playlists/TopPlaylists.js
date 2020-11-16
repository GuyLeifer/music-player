import React from 'react';
import './Playlists.css';

// packages
import Carousel from 'styled-components-carousel';
import { Link } from 'react-router-dom';

// components
import Playlist from './Playlist';

function TopPlaylists( { topPlaylists, topOption }) {
    
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
                    {topPlaylists.map(playlist => {
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
                    {topPlaylists.map(playlist => {
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