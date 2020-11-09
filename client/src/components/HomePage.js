import React, { useState } from 'react';
import './HomePage.css';

// components
import TopSongs from './songs/TopSongs';
import TopArtists from './artists/TopArtists';
import TopAlbums from './albums/TopAlbums';
import TopPlaylists from './playlists/TopPlaylists';

function HomePage() {

    const [topOption, setTopOption] = useState("like");

    return (
        <div className="homepage">

            <div className="topTitles"> 
                <h2 className="topLink" onClick={() => setTopOption("like")}>Top Liked</h2>
                <h2 className="topLink" onClick={() => setTopOption("play")}>Top Played</h2>
                <h2 className="topLink" onClick={() => setTopOption("new")}>Newest</h2>
            </div>

            <TopSongs topOption={topOption}/>
            <TopArtists topOption={topOption}/>
            <TopAlbums topOption={topOption}/>
            <TopPlaylists topOption={topOption}/>
        </div>
    )
}

export default HomePage