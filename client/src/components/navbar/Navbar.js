import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './Searchbar';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Modal from 'react-modal';

// Modal issue
Modal.setAppElement('div');

function Navbar() {
    const navStyle = {
        color: 'white'
    };

const [logOutShown, setLogOutShown] = useState(false);
const [wantLogin, setWantLogin] = useState(false);
const [user, setUser] = useState(null);

const { register, handleSubmit, errors } = useForm(); // initialize the hook

// verify user
useEffect(  () => {
    fetchUser();
}, [])

const fetchUser = async () => {
    const { data } = await axios.get('/users/verify');
    if(data.user) {
        setUser(data.user);
    } else {
        setUser(false);
    }   
};

const onLoginSubmit = async (data) => {
    const { email, password } = data;
    console.log( email, password);
    const res = await axios.post('/users/login', {
        email: email,
        password: password,
    })
    console.log("res", res)
    const info = await res.data;
    console.log("info",info)
    if (info.user) {
        setUser(info.user);
        localStorage.setItem("userId", info.user.id)
        console.log("user", user)
        setWantLogin(false);
    }
};

const logout = async () => {
    axios.post('/users/logout');
    setUser(null);
    setLogOutShown(false);
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
            <img className="navImg" src="https://i.pinimg.com/564x/91/c1/cd/91c1cdeacc84d0a5673bb716549ba366.jpg" />
            <h3 className="navH3">My Streamer</h3>
            <ul className="nav-links">
            <Link style={navStyle} to='/'>
                    <li><img className="navImg" src="https://www.kindpng.com/picc/m/436-4369832_homepage-icon-png-png-download-transparent-black-home.png" alt="Home" /></li>
                </Link>
                {/* <Link style={navStyle} to='/add'>
                    <li>Add</li>
                </Link> */}
                <Link style={navStyle} to='/about'>
                    <li><img className="navImg" src="https://icon-library.com/images/info-icon-png/info-icon-png-15.jpg" alt="About" /></li>
                </Link>
                <div style={{
                    width: 200,}}>
                    <Searchbar />
                </div>
                {/* <Link style={navStyle} to='/account'> */}
                <div className='login'>
                    {user && (
                        <div>
                            <Link to={`/user/${user.id}`}>
                                <li className='username'
                                onMouseEnter={() => setLogOutShown(true)}
                                >
                                    {user.name.split(' ').map(name => name[0])}
                                </li>
                            </Link>
                            {logOutShown && (
                                <li className="logout" onClick={() => logout()}>(Log - Out)</li>
                            )}
                        </div>
                    )}   
                    {!user && (
                        <li onClick={() => setWantLogin(!wantLogin)}><img className="navImg" src="https://cdn4.iconfinder.com/data/icons/rounded-white-basic-ui/139/Profile01-RoundedWhite-512.png"/></li>
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