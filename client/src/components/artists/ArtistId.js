import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import YouTube from 'react-youtube';

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
            <div>
            <h3>Songs:</h3>
                <Carousel
                center
                infinite
                showArrows
                showIndicator
                slidesToShow={5}>
                {artist.Songs.map((song) => {
                    return (
                        <Link to={`/song/${song.id}?artist=${song.artistId}`}>
                            <div className="songOnArtist">  
                                        <p>{song.title}</p>
                                        <YouTube videoId={song.youtubeLink} opts={opts} />
                            </div>
                        </Link>
                    )
                })}
                </Carousel>
                <div>
                    <h3>Albums:</h3>
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
                                        <p>{album.name}</p>
                                        <div>
                                            <img src={album.coverImg} alt={album.name}/>
                                        </div>
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