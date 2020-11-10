import React from 'react';
import './Artists.css';


function Artist({artist}) {

    return (
        artist ?
            <div className="artist">
                <span className="artistName">{artist.name}</span>
                <div className="artistImg">
                    <img src={artist.coverImg} alt={artist.name}/>
                </div>
            </div>
        : 
        <>
        </>
    )
}

export default Artist;