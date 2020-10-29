import React from 'react';
import './Artists.css';


function Artist({artist}) {

    return (
        <>
            <div className="artist">
               <span className="artistName">{artist.name}</span>
               <div className="artistImg">
                    <img src={artist.coverImg}/>
                </div>
            </div>
        </>
    )
}

export default Artist;