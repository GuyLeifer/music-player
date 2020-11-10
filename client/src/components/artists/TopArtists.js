import React, { useEffect, useState } from 'react';
import './Artists.css';

// packages
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import Artist from './Artist';


function TopArtists( {topOption }) {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        topOption === "like" ? (
            (async () => {
                try {
                const { data } = await axios.get('/interactions/artists/topartists');
                setArtists(data);
                }
                catch(err) {
                    console.log(err.massage);
                }
            })()
        ) : (
            (async () => {
                try {
                const { data } = await axios.get(`/artists/top/${topOption}`);
                setArtists(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        )
    }, [topOption])

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
                    {artists.map(artist => {
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
                    {artists.map(artist => {
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