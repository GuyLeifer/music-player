import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Artist from './Artist';
import { Link } from 'react-router-dom';
import './Artists.css';

function TopArtists() {
    const [artists, setArtists] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/artists');
            setArtists(data);
            }
            catch(err) {
                console.log(err.massage);
            }
        })()
    }, [])

    return (
        <div className="topArtists">
            <div className="topHeader">Top Artists</div>
            <Carousel         
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={3}>
                {artists.map(artist => {
                    return (
                        <Link to = {`/artist/${artist.id}`}>
                            <Artist artist={artist} />
                        </Link>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default TopArtists;