import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Album from '../albums/Album';
import Song from '../songs/Song';
import likeIcon from '../images/likeIcon.webp';

function ArtistId(match) {

    const [artist, setArtist] = useState(null);
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchArtist();
        fetchUser();
    }, []);

    useEffect(() => {
        fetchIsLiked();
    }, [user, artist]);

    console.log(user)

    const fetchArtist = async() => {
        const { data } = await axios.get(`/artists/${match.match.params.id}`);
        setArtist(data);
    }
    const fetchUser = async () => {
        const { data } = await axios.get('/users/verify');
        if(data.user) {
            setUser(data.user);
        } else {
            setUser(false);
        }   
    };
    const fetchIsLiked = async () => {
        if (user && artist) {
            const { data } = await axios.get(`/interactions/artists/${user.id}&${artist.id}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likeArtist = async () => {
        const { data } = await axios.get(`/interactions/artists/${user.id}&${artist.id}`)
        if (data) {
            await axios.patch('/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: true
            })
        } else {
            await axios.post('/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeArtist = async () => {
        const data = await axios.get(`/interactions/artists/${user.id}&${artist.id}`)
        if (data) {
            await axios.patch('/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: false
            })
        } else {
            await axios.post('/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }
    
    return (
        <>
            {artist && (
        <div className="info">
            <div className="title">Artist Name: {artist.name}</div>
            {user && (
                <div>
                    {!isLiked && (
                        <img className="likeIcon" onClick={() => likeArtist()} src={likeIcon} alt="Like"/>
                    )}
                    {isLiked && (
                        <img className="unlikeIcon" onClick={() => unlikeArtist()} src={likeIcon} alt="Unlike"/>
                    )}
                </div>
            )}
            <div className="artistContainer">
                <div>
                    <div>Cover Image: 
                        <div>
                            <img src={artist.coverImg} alt={artist.name} />
                        </div>
                    </div>
                    <div>Created At: {artist.createdAt}</div>
                    <div>Updated At: {artist.updatedAt}</div>
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
            <div className="ArtistMasterpiece">
                <h2>All Songs Of Artist</h2>
                <div className="songsOnArtistDiv">
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
            </div>
            </div>
            )}
</>
    )
}

export default ArtistId