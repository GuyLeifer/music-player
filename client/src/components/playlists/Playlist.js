  
import React from 'react';
import { Link } from 'react-router-dom';

function Playlist({playlist}) {
    return (
        <Link to = {`/playlist/${playlist.id}`}>
            <div className="playlist">
               <span className="playlistName">{playlist.name}</span>
               <div className="albumImg">
                    <img src={playlist.coverImg}/>
                </div>
            </div>
        </Link>
    )
}

export default Playlist;