import React, { useEffect, useState } from 'react';
import './Albums.css';

// packages
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { Link } from 'react-router-dom';

// components
import Album from './Album';

function TopAlbums({ topOption }) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        topOption === "like" ? (
            (async () => {
                try {
                const { data } = await axios.get('/interactions/albums/topalbums');
                setAlbums(data);
                }
                catch(err) {
                    console.log(err.massage);
                }
            })()
        ) : (
            (async () => {
                try {
                const { data } = await axios.get(`/albums/top/${topOption}`);
                setAlbums(data);
                }
                catch(err) {
                    console.log(err);
                }
            })()
        )
    }, [topOption])

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
                    {albums.map(album => {
                        return (
                            <Link to = {`/albums/${albums.id}`} key={albums.id}>
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
                    {albums.map(interaction => {
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