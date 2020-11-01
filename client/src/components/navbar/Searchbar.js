import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSearchBox from 'react-search-box';
import './Navbar.css';

function Searchbar() {

    const [options, setOptions] = useState([]);


    useEffect(() => {
        (async () => {
            try {
            const { data } = await axios.get('/search/all');
            setOptions(data);
            }
            catch(err) {
                console.log(err.massage);
            }
        })()
    }, [])

    const changeHandler = async (e) => {
        try {
            const { data } = await axios.get(`/search?params=${e}`);
            setOptions(data);
            }
            catch(err) {
                console.log(err.massage);
            }
    }
    const goToPage = (e) => {
        const link = `/${e.type}/${e.id}`;
        window.location.href = link;
    }

    return (
        <div className="searchContainer">
            <ReactSearchBox
                className="searchBox"
                placeholder="Search..." 
                data={options}
                onChange={(e) => changeHandler(e)}
                onSelect={(e) => goToPage(e)}
                dropDownHoverColor="white"
            />
        </div> 
    );
}

export default Searchbar