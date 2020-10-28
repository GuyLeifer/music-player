import React from 'react'
import { Link } from 'react-router-dom';
import './Albums.css';


function Album({album}) {

    return (
            <Link to = {`/album/${album.id}`}>
            <div className="album" >
               <span className="albumName">{album.name}</span> 
               <div className="albumImg">
                    <img src={album.coverImg}/>
                </div>
            </div>
            </Link>
    )
}

export default Album;