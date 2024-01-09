import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterCredentials } from '../validations/user.validation';
import {useDispatch, useSelector} from 'react-redux';
import { FAILURE, REGISTER_SUCCESS, REQUEST } from '../redux/actionTypes';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const initialState = { email: '', password: '', name: '' }

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading} = useSelector(store => store);
    const [userCred, setUserCred] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCred({ ...userCred, [name]: value });
    };

    const handleSubmit = (evnt)=>{
        evnt.preventDefault();
        const check = userRegisterCredentials.safeParse(userCred);
        if(!check.success) return alert('Enter correct credentials');
        sendCredentials();
    }

    const sendCredentials = async()=>{
        try{
            dispatch({type: REQUEST})
            const res = await axios.post(`${backendServerUrl}user/register`, userCred);
            dispatch({type: REGISTER_SUCCESS})
            navigate('/login');
        }catch(err){
            console.log(err);
            dispatch({type: FAILURE, payload: err.response.data.Error})
        }
    }

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2 style={styles['container>h1']}>Register</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input style={styles.inputBox} placeholder='Name' type='text' name='name' value={userCred.name} onChange={handleChange} required />
                    <input style={styles.inputBox} placeholder='Email' type='email' name='email' value={userCred.email} onChange={handleChange} required />
                    <input style={styles.inputBox} placeholder='Password' type='password' name='password' value={userCred.password} onChange={handleChange} required />
                    <input style={styles.button} type="submit" value={isLoading? "Registering": "Register"} />
                </form>
                <div style={styles.redirecting}>
                    Already an user? <Link to={'/login'}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;


const styles = {
    body: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    container: {
        padding: '24px',
        border: '2px solid black',
    },
    'container>h1':{
        marginBottom: '12px'
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputBox: {
        height: '2.5rem',
        width: '20rem',
        fontSize: '1rem',
        padding: '0 12px'
    },
    button:{
        height: '2.5rem'
    },
    redirecting: {
        marginTop: '1rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}