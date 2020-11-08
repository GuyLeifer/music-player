import React from 'react';
import './Playlists.css';

function Playlist({playlist}) {
    if(playlist) {
    return (
            <div className="playlist">
                <span className="playlistName">{playlist.name}</span>
                <div className="playlistImg">
                    <img src={playlist.coverImg} alt={playlist.name}/>
                </div>
            </div>
    )} else {
        return (
            null
        )
    }
}

export default Playlist;