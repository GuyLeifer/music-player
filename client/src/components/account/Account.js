import React, { useState } from 'react';
import './Account.css';

// packages
import { useForm } from 'react-hook-form';
import axios from 'axios';

// recoil
import { useSetRecoilState } from "recoil";
import { userState } from '../../Atoms/userState';


function Account() {

    const setUserState = useSetRecoilState(userState);
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, errors } = useForm(); // initialize the hook

    const onSignUpSubmit = async (data) => {
        const { name, email, password } = data;
        const res = await axios.post('/api/users/signup', {
            name: name,
            email: email,
            password: password,
        })
        const info = await res.data;
        if (info.user) {
            setLoading(true)
            setUserState(info.user)
            setTimeout(() => {
                window.location.assign('/')
            }, 2000);
        }
    };

    return (
        <div className="account">
            <h2>Sign - Up</h2>
            <form className="accountForm" onSubmit={handleSubmit(onSignUpSubmit)}>
                <div>
                    <label htmlFor="name">Full Name:</label>
                    <input className="input" name="name" ref={register({ required: true })} placeholder="Full Name" />
                    <div className="error">{errors.name && 'Full name is required.'}</div>
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input className="input" name="email" type="email" ref={register({ required: true })} placeholder="E-mail" />
                    <div className="error">{errors.email && 'E-mail is required.'}</div>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="input" name="password" type="password" ref={register({ required: true })} placeholder="Password" />
                    <div className="error">{errors.password && 'Please enter your password.'}</div>
                </div>
                <input className="input" type="submit" value="Sign - Up" />
            </form>
        </div>
    )
}

export default Account
