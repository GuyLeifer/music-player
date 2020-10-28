import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Album from './Album';

function TopAlbums() {
    const [albums, setAlbums] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/albums');
            setAlbums(data);
            }
            catch(err) {
                console.log(err.massage);
            }
        })()
    }, [])

    return (
        <div className="topAlbums">
            <div className="topHeader">Top Albums</div>
            <Carousel         
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={3}>
                {albums.map(album => {
                    return <Album album={album} />
                })}
            </Carousel>
        </div>
    )
}

export default TopAlbums;