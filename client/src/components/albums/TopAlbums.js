import React from 'react';
import './Albums.css';

// packages
import Carousel from 'styled-components-carousel';
import { Link } from 'react-router-dom';

// components
import Album from './Album';

function TopAlbums({ topAlbums, topOption }) {

    return (
        <div className="topAlbums">
            <div className="topHeader">Top Albums</div>
            {topOption === "new" ? (
                <Carousel         
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                    {topAlbums.map(album => {
                        return (
                            <Link to = {`/albums/${album.id}`} key={album.id}>
                                <Album album={album} />
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
                    {topAlbums.map(interaction => {
                        return (
                            <Link to={`/album/${interaction.albumId}`} key={interaction.albumId}>
                                <Album album={interaction.Album} />
                            </Link>
                        )
                    })}
                </Carousel>              
            )}
        </div>
    )
}

export default TopAlbums;