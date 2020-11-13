import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';

// icons
import searchIcon from './images/searchIcon.png';
import songIcon from './images/songIcon.webp';
import artistIcon from './images/artistIcon.png';
import albumIcon from './images/albumIcon.webp';
import playlistIcon from './images/playlistIcon.jpg';


function Searchbar() {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        (async () => {
            await axios.post('/search/all')
        })()
    }, [])

    const changeHandler = async (e) => {
        try {
            // const { data } = await axios.get(`/search?params=${e.target.value}`);
            // setOptions(data);
            const info = await axios.get(`/elasticsearch/all?params=${e.target.value}`);
            console.log("info", info.data)
            }
            catch(err) {
                console.log(err.massage);
            }
    }
    const goToPage = (type, id) => {
        const link = `/${type}/${id}`;
        window.location.href = link;
    }

    return (
        <div className="searchContainer">
            <img className="search-icon" src={searchIcon} alt="search"/>
            <input 
                id="search"
                type="search" 
                onChange={(e) => changeHandler(e)}
            />
            {options && (
                <div className="options">
                {options.map(option => 
                    <div 
                        className={"option " + option.type} 
                        key={option.type + " " + option.id}
                        onClick={() => goToPage(option.type, option.id)}
                    >
                            <div className="optionName">{option.value}</div>
                            <div className="optionIconDiv">
                                {option.type === "song" ? <img className="optionIcon" src={songIcon} alt="songIcon" />
                                : option.type === "artist" ? <img className="optionIcon" src={artistIcon} alt="artistIcon" />
                                : option.type === "album" ? <img className="optionIcon" src={albumIcon} alt="albumIcon" />
                                : <img className="optionIcon" src={playlistIcon} alt="playlistIcon" />
                            }
                                
                            </div>
                    </div>
                )}
                </div>
            )}
        </div> 
    );
}

export default Searchbar