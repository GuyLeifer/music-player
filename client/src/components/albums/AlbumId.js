import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';

function AlbumId(match) {
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        fetchAlbum();
    }, []);

    const fetchAlbum = async() => {
        const { data } = await axios.get(`/albums/${match.match.params.id}`);
        setAlbum(data);
    }

    const opts = {
        height: '160',
        width: '260',
    }   

    return (
        <>
        {album && (
            <div className="info">
                <div>Album Name: {album.name}</div>
                <Link to = {`/artist/${album.artistId}`}>
                    Artist Name: {album.Artist.name}
                </Link>
                <div>Created At: {album.createdAt}</div>
                <div>Updated At: {album.updatedAt}</div>
                <div><h3>Cover Image:</h3> 
                    <div>
                        <img src={album.coverImg} alt={album.name}/>
                    </div>
                </div>
                <div className="songsOnAlbumDiv">
                    <h3 className="subHeader">Songs:</h3>
                    <Carousel
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                    {album.Songs.map((song) => {
                        return (
                            <Link to={`/song/${song.id}?album=${song.albumId}`}> 
                                <Song song={song} />
                            </Link>  
                        )
                    })} 
                    </Carousel>
                </div>
            </div>            
        )}
        </>
    )
}

export default AlbumId