import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Link to="/">
            <header className="header">
                <h1>Music
                <img className="headerImg" src="https://cdn.icon-icons.com/icons2/1211/PNG/512/1491579593-yumminkysocialmedia38_83075.png" alt="Music Player"/>
                    Player
                </h1>   
            </header>
        </Link>
    )
}

export default Header