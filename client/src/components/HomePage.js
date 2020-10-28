import React from 'react';
import TopSongs from './songs/TopSongs';
import TopArtists from './artists/TopArtists';
import TopAlbums from './albums/TopAlbums';
import TopPlaylists from './playlists/TopPlaylists';

function HomePage() {
    return (
        <div className="homepage">
            <TopSongs />
            <TopArtists />
            <TopAlbums />
            <TopPlaylists />
        </div>
    )
}

export default HomePage