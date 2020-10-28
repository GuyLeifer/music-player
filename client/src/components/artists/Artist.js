import React from 'react';
import { Link } from 'react-router-dom';


function Artist({artist}) {

    return (
        <>
        <Link to = {`/artist/${artist.id}`}>
            <div className="artist">
               <span className="artistName">{artist.name}</span>
               <div className="artistImg">
                    <img src={artist.coverImg}/>
                </div>
            </div>
        </Link>
        </>
    )
}

export default Artist;