import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Artist from './Artist';

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
                    return <Artist artist={artist} />
                })}
            </Carousel>
        </div>
    )
}

export default TopArtists;