import React, { useState, useCallback } from 'react';
import './HomePage.css';

// components
import TopSongs from './songs/TopSongs';
import TopArtists from './artists/TopArtists';
import TopAlbums from './albums/TopAlbums';
import TopPlaylists from './playlists/TopPlaylists';

function HomePage() {

    const [topOption, setTopOption] = useState("like");

    const setTop = useCallback((option) => {
        setTopOption(option);

        if (option === "like") {
            document.getElementById(option).setAttribute("class", "chosen");
            const play = document.getElementById("play");
            if (play.classList.contains("chosen")) play.classList.remove("chosen");
            const newEl = document.getElementById("new");
            if (newEl.classList.contains("chosen")) newEl.classList.remove("chosen");
        }
        if (option === "play") {
            document.getElementById(option).setAttribute("class", "chosen");
            const like = document.getElementById("like");
            if (like.classList.contains("chosen")) like.classList.remove("chosen");
            const newEl = document.getElementById("new");
            if (newEl.classList.contains("chosen")) newEl.classList.remove("chosen");
        }
        if (option === "new") {
            document.getElementById(option).setAttribute("class", "chosen");
            const like = document.getElementById("like");
            if (like.classList.contains("chosen")) like.classList.remove("chosen");
            const play = document.getElementById("play");
            if (play.classList.contains("chosen")) play.classList.remove("chosen");
        }
    }, [])

    return (
        <div className="homepage">

            <div className="topTitles"> 
                <h2 id="like" className="chosen" onClick={() => setTop("like")}>Top Liked</h2>
                <h2 id="play" onClick={() => setTop("play")}>Top Played</h2>
                <h2 id="new" onClick={() => setTop("new")}>Newest</h2>
            </div>

            <TopSongs topOption={topOption}/>
            <TopArtists topOption={topOption}/>
            <TopAlbums topOption={topOption}/>
            <TopPlaylists topOption={topOption}/>
        </div>
    )
}

export default HomePage