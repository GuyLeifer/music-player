import React from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

function Song({song}) {

    const opts = {
        height: '160',
        width: '260',
    }
    
    return (
        <Link to = {`/song/${song.id}`}>
            <div className="song" >
                <span className="songTitle">{song.title}</span> 
                <span className="songLength">{song.length}</span>
                <div>
                    <YouTube videoId={song.youtubeLink} opts={opts} />
                    {/* <iframe src={`https://www.youtube.com/embed/${song.YouTube_Link}`}/> */}
                </div>
            </div>
        </Link>
    )
}

export default Song