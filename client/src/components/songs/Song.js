import React from 'react';
import YouTube from 'react-youtube';
import './Songs.css';

function Song({song}) {

    const opts = {
        height: '160',
        width: '260',
    }
    
    return (
            <div className="song" >
                <span className="songTitle">{song.title}</span> 
                <span className="songLength">{song.length}</span>
                <div>
                    <YouTube videoId={song.youtubeLink} opts={opts} />
                    {/* <iframe src={`https://www.youtube.com/embed/${song.YouTube_Link}`}/> */}
                </div>
            </div>
    )
}

export default Song