import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Searchbar from './Searchbar';

// packages
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

//recoil
import { useRecoilState } from "recoil";
import { userState } from '../../Atoms/userState';

//icons
import youtubeIcon from './images/youtubeIcon.jpg';
import homeIcon from './images/homeIcon.png';
import aboutIcon from './images/aboutIcon.jpg';
import loginIcon from './images/loginIcon.webp';

// Modal issue
Modal.setAppElement('div');

function Navbar() {
    const navStyle = {
        color: 'white'
    };

// states
const [logOutShown, setLogOutShown] = useState(false);
const [wantLogin, setWantLogin] = useState(false);
// recoil states
const [user, setUser] = useRecoilState(userState);

const { register, handleSubmit, errors } = useForm(); // initialize the hook

// verify user
useEffect(  () => {
    fetchUser();
}, [])

const fetchUser = async () => {
    const { data } = await axios.get('/users/verify');
    if(data.user) {
        const username = await axios.get(`/users/${data.user.id}`);
        setUser(username.data);
    } else {
        setUser(null);
    }   
};

const onLoginSubmit = async (data) => {
    const { email, password } = data;
    const res = await axios.post('/users/login', {
        email: email,
        password: password,
    })
    const info = await res.data;
    if (info.user) {
        console.log("info", info.user)
        setUser(info.user);
        setWantLogin(false);
    }
};

const logout = async () => {
    axios.post('/users/logout');
    setUser(null);
    setLogOutShown(false);
    window.location.assign('/');
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-30%',
        transform             : 'translate(-50%, -50%)',
        background            : ' rgb(73, 79, 82)',
        color                 : 'white',
        borderRadius          : '10%'
    }
    
};

    return (
        <nav onMouseLeave={() => setLogOutShown(false)}>
            <div className="nav-titles">
                <Link to={'/'}>
                    <img className="navImg" src={youtubeIcon} alt="YouTube Icon"/>
                </Link>
                <h3 className="navH3">My Streamer</h3>
                <div 
                style={{width: 300,}}>
                    <Searchbar />
                </div>
            </div>
    
            <ul className="nav-links">
            <Link style={navStyle} to='/'>
                    <li><img className="navImg" src={homeIcon} alt="Home" /></li>
                </Link>
                {/* <Link style={navStyle} to='/add'>
                    <li>Add</li>
                </Link> */}
                <Link style={navStyle} to='/about'>
                    <li><img className="navImg" src={aboutIcon} alt="About" /></li>
                </Link>
                
                {/* <Link style={navStyle} to='/account'> */}
                <div className='login'>
                    {user ? (
                        <div>
                            <Link to={`/user/${user.id}`}>
                                <li className='username navImg'
                                onMouseEnter={() => setLogOutShown(true)}
                                >
                                    {user.name ? 
                                        user.name.split(' ').map(name => name[0])
                                    : null}
                                </li>
                            </Link>
                            {logOutShown && (
                                <li className="logout" onClick={() => logout()}>(Log - Out)</li>
                            )}
                        </div>
                    ) : null }   
                    {!user && (
                        <li onClick={() => setWantLogin(!wantLogin)}><img className="navImg" src={loginIcon} alt="Login"/></li>
                    )}             
                        <Modal
                        isOpen={wantLogin}
                        onRequestClose={() => setWantLogin(!wantLogin)}
                        style={customStyles}
                        >
                        <h2 className="modalTitle">Log - In</h2>
                        <form className="accountForm" onSubmit={handleSubmit(onLoginSubmit)}>
                        <div className="labelInput">
                            <label htmlFor="email">E-mail:</label>
                            <input className="input" name="email" type="email" ref={register({ required: true })} placeholder="E-mail"/>
                            <div className="error">{errors.email && 'E-mail is required.'}</div>
                        </div>
                        <div className="labelInput">
                            <label htmlFor="password">Password:</label>
                            <input className="input" name="password" type="password" ref={register({ required: true })} placeholder="Password"/>
                            <div className="error">{errors.password && 'Please enter your password.'}</div>
                        </div>
                        <input className="input" type="submit" value="Login"/>
                    </form>
                    <div className="signup">
                        <p>Does not have an account?</p>
                        <Link to="/account">
                            <h3 className="signupLink" onClick={() => setWantLogin(false)}>Sign - Up!</h3>
                        </Link>                    
                    </div>
                    </Modal>
                </div>
                {/* </Link> */}
            </ul>
        </nav>
    )
}

export default Navbar