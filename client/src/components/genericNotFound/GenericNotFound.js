  
import React from 'react';
import './GenericNotFound.css';
import { Link } from 'react-router-dom';

function GenericNotFound() {
    return (
        <div className="four0four">
            <img src="https://static.collectui.com/shots/2421479/daily-ui-24-error-404-large"/>
            <Link to="/">
                <div className="home">Go Home
                    <div>
                        <img src="https://icon-library.com/images/home-logo-icon/home-logo-icon-0.jpg"/>   
                    </div>     
                </div>
            </Link>
        </div>
    )
}

export default GenericNotFound