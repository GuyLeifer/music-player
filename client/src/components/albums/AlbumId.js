import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'styled-components-carousel';
import Song from '../songs/Song';
import likeIcon from '../images/likeIcon.webp';

function AlbumId(match) {

    const [album, setAlbum] = useState(null);
    const [user, setUser] = useState(null);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchAlbum();
        fetchUser();
    }, []);

    useEffect(() => {
        fetchIsLiked();
    }, [user, album]);

    const fetchAlbum = async() => {
        const { data } = await axios.get(`/albums/${match.match.params.id}`);
        setAlbum(data);
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
        if (user && album) {
            const { data } = await axios.get(`/interactions/albums/${user.id}&${album.id}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likeAlbum = async () => {
        const { data } = await axios.get(`/interactions/albums/${user.id}&${album.id}`)
        if (data) {
            await axios.patch('/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: true
            })
        } else {
            await axios.post('/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeAlbum = async () => {
        const data = await axios.get(`/interactions/albums/${user.id}&${album.id}`)
        if (data) {
            await axios.patch('/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: false
            })
        } else {
            await axios.post('/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    return (
        <>
        {album && (
            <div className="info">
                <div className="title">Album Name: {album.name}</div>
                <Link to = {`/artist/${album.artistId}`} className="artistLink title">
                    Artist Name: {album.Artist.name}
                </Link>
                {user && (
                    <div>
                        {!isLiked && (
                            <img className="likeIcon" onClick={() => likeAlbum()} src={likeIcon} alt="Like"/>
                        )}
                        {isLiked && (
                            <img className="unlikeIcon" onClick={() => unlikeAlbum()} src={likeIcon} alt="Unlike"/>
                        )}
                    </div>
                )}
                <div className="albumContainer">
                    <div>
                        <div><h3>Cover Image:</h3> 
                            <div>
                                <img src={album.coverImg} alt={album.name}/>
                            </div>
                        </div>
                        <div>Created At: {album.createdAt}</div>
                        <div>Updated At: {album.updatedAt}</div>
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
            </div>            
        )}
        </>
    )
}

export default AlbumId