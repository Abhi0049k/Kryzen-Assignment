import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = { email: '', password: '', name: '' }

const Register = () => {
    const [userCred, setUserCred] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCred({ ...userCred, [name]: value });
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2 style={styles['container>h1']}>Login</h2>
                <form style={styles.form}>
                    <input style={styles.inputBox} placeholder='Name' type='text' name='name' value={userCred.name} onChange={handleChange} required />
                    <input style={styles.inputBox} placeholder='Email' type='email' name='email' value={userCred.email} onChange={handleChange} required />
                    <input style={styles.inputBox} placeholder='Password' type='password' name='password' value={userCred.password} onChange={handleChange} required />
                    <input style={styles.button} type="submit" value="Register" />
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