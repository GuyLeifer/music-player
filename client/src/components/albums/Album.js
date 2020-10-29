import React from 'react'
import './Albums.css';


function Album({album}) {

    return (
            <div className="album" >
               <span className="albumName">{album.name}</span> 
               <div className="albumImg">
                    <img src={album.coverImg}/>
                </div>
            </div>
    )
}

export default Album;