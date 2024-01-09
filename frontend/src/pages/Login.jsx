import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginCredentials } from '../validations/user.validation';
import { FAILURE, LOGIN_SUCCESS, REQUEST } from '../redux/actionTypes';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;
const initialState = { email: '', password: '' }

const Login = () => {
    const [userCred, setUserCred] = useState(initialState);
    const {isLoading} = useSelector(store=> store);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCred({ ...userCred, [name]: value });
    };

    const handleSubmit = (evnt) => {
        evnt.preventDefault();
        const check = userLoginCredentials.safeParse(userCred);
        if (!check.success) return alert('Enter correct credentials');
        sendCredentials();
    }

    const sendCredentials = async () => {
        try {
            dispatch({ type: REQUEST })
            const res = await axios.post(`${backendServerUrl}user/login`, userCred);
            document.cookie=`token=${res.data.token}`;
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })
            navigate('/');
        } catch (err) {
            console.log(err);
            dispatch({ type: FAILURE, payload: err.response.data.Error })
        }
    }

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2 style={styles['container>h1']}>Login</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input style={styles.inputBox} placeholder='Email' type='email' name='email' value={userCred.email} onChange={handleChange} />
                    <input style={styles.inputBox} placeholder='Password' type='password' name='password' value={userCred.password} onChange={handleChange} />
                    <input style={styles.button} type="submit" value={isLoading ? "Loading...": "Login"} />
                </form>
                <div style={styles.redirecting}>
                    New User? <Link to={'/register'}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;


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
    'container>h1': {
        marginBottom: '12px'
    },
    form: {
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
    button: {
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