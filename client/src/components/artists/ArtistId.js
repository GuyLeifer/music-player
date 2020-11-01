import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Album from '../albums/Album';
import Song from '../songs/Song';

function ArtistId(match) {
    console.log("match: ", match);
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        fetchArtist();
    }, []);


    const fetchArtist = async() => {
        const { data } = await axios.get(`/artists/${match.match.params.id}`);
        console.log("data :" , data)
        setArtist(data);
        console.log("artist: ",artist)
    }
  

    const opts = {
        height: '160',
        width: '260',
    }    
    
    return (
        <>
            {artist && (
        <div className="info">
            <div>Artist Name: {artist.name}</div>
            <div>Created At: {artist.createdAt}</div>
            <div>Updated At: {artist.updatedAt}</div>
            <div>Cover Image: 
                <div>
                    <img src={artist.coverImg} alt={artist.name} />
                </div>
            </div>
            <div className="ArtistMasterpiece">
                <div className="songsOnArtistDiv">
                    <h3 className="subHeader">Songs:</h3>
                        <Carousel
                        center
                        infinite
                        showArrows
                        showIndicator
                        slidesToShow={3}>
                        {artist.Songs.map((song) => {
                            return (
                                <Link to={`/song/${song.id}?artist=${song.artistId}`}>
                                    <div className="songOnArtist">  
                                        <Song song={song} />
                                    </div>
                                </Link>
                            )
                        })}
                        </Carousel>
                </div>
                <div className="albumsOnArtistDiv">
                    <h3 className="subHeader">Albums:</h3>
                    <Carousel
                    center
                    infinite
                    showArrows
                    showIndicator
                    slidesToShow={3}>
                        {artist.Albums.map((album) => {
                            return (
                                <Link to={`/album/${album.id}?artist=${album.artistId}`}>
                                    <div className="albumOnArtist">
                                        <Album album={album} />
                                    </div>
                                </Link>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
            </div>
            )}
</>
    )
}

export default ArtistId