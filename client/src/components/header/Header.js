import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import streamerIcon from './images/streamerIcon.png';

function Header() {
    return (
        <Link to="/">
            <header className="header">
                <h1>Music
                <img className="headerImg" src={streamerIcon} alt="Music Player"/>
                    Player
                </h1>   
            </header>
        </Link>
    )
}

export default Header