import React from 'react';
import './Playlists.css';

function Playlist({playlist}) {
    return (
        playlist ?
            <div className="playlist">
                <span className="playlistName">{playlist.name}</span>
                <div className="playlistImg">
                    <img src={playlist.coverImg} alt={playlist.name}/>
                </div>
            </div>
            : 
            <>
            </>
    )
}

export default Playlist;