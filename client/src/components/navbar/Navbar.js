import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <img className="navImg" src="https://medias.timeout.co.il/www/uploads/2018/05/youtube-music-t-600x600.jpg" />
            <h3 className="navH3">My Streamer</h3>
            <ul className="nav-links">
            <Link style={navStyle} to='/'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/top_songs'>
                    <li>Top Songs</li>
                </Link>
                <Link style={navStyle} to='/top_artists'>
                    <li>Top Artists</li>
                </Link>
                <Link style={navStyle} to='/top_albums'>
                    <li>Top Albums</li>
                </Link>
                <Link style={navStyle} to='/Top_playlists'>
                    <li>Top Playlists</li>
                </Link>
                {/* <Link style={navStyle} to='/add'>
                    <li>Add</li>
                </Link> */}
                <Link style={navStyle} to='/about'>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar