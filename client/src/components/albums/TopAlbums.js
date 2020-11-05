import React, { useEffect, useState } from 'react';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import Album from './Album';
import { Link } from 'react-router-dom';
import './Albums.css';

function TopAlbums() {
    const [albums, setAlbums] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/interactions/albums/topalbums');
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
                {albums.map(interaction => {
                    return (
                        <Link to={`/album/${interaction.albumId}`} key={interaction.albumId}>
                            <Album album={interaction.Album} />
                        </Link>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default TopAlbums;