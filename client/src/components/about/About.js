import React from 'react';
import './About.css';

//icons
import youtubeIcon from './images/youtubeIcon.jpg';

function About() {
    return (
        <div className="about">
            <h1>
                About Page
            </h1>
            <img className="aboutImg" src={youtubeIcon} alt="About"/>
            <p>This is a Music Streamer Included a DataBase of Songs, Artists, Albums and Playlist.</p>
            <p>Enjoy the Experience of the Streamer!</p>
        </div>
    )
}

export default About