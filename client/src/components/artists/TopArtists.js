import React from 'react';
import './Artists.css';

// packages
import Carousel from 'styled-components-carousel';
import { Link } from 'react-router-dom';

// components
import Artist from './Artist';

function TopArtists({ topArtists, topOption }) {

    return (
        <div className="topArtists">
            <div className="topHeader">Top Artists</div>
            {topOption === "new" ? (
                <Carousel         
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                    {topArtists.map(artist => {
                        return (
                            <Link to = {`/artist/${artist.id}`} key={artist.id}>
                                <Artist artist={artist} />
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
                    {topArtists.map(artist => {
                        return (
                            <Link to = {`/artist/${artist.artistId}`} key={artist.artistId}>
                                <Artist artist={artist.Artist} />
                            </Link>
                        )
                    })}
                </Carousel>                
            )}
        </div>
    )
}

export default TopArtists;