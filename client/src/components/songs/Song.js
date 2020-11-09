import React, { useState } from 'react';
import './Songs.css';

// packages
import YouTube from 'react-youtube';
import axios from 'axios';

// recoil
import { useRecoilState } from 'recoil';
import { userState } from '../../Atoms/userState';


function Song({song}) {

    const [user, setUser] = useRecoilState(userState);
    const [counterLimit, setCounterLimit] = useState(1);

    const opts = {
        height: '160',
        width: '260',
    }

    const playCounter = async () => {
        console.log("song Is Playing")
        if ( (user) && (counterLimit === 1) ) {
            const userId = user.id
            console.log("userId", userId, "songId", song.id)
            await axios.patch('/interactions/songs', {
                userId: userId,
                songId: song.id
            })
            setCounterLimit(0);
        } else if ( (!user) && (counterLimit === 1)) {
            await axios.patch(`/songs/${song.id}`)
            setCounterLimit(0);
        }
    }
    
    return (
            <div className="song" >
                <span className="songTitle">{song.title}</span> 
                <span className="songLength">{song.length}</span>
                <div>
                    <YouTube videoId={song.youtubeLink} opts={opts} onPlay={() => playCounter()}/>
                    {/* <iframe src={`https://www.youtube.com/embed/${song.YouTube_Link}`}/> */}
                </div>
            </div>
    )
}

export default Song