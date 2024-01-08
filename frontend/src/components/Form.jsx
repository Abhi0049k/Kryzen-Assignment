import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userData } from '../validations/userData.validation';
import { FAILURE, PDF_CREATED, REQUEST } from '../redux/actionTypes';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const UserForm = () => {
  const {isLoading, token} = useSelector(store => store);
  const dispatch = useDispatch()
  const [userDt, setuserDt] = useState({
    name: '',
    age: '',
    address: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      setuserDt({ ...userDt, age: Number(value) })
    } else
      setuserDt({ ...userDt, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setuserDt({ ...userDt, photo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = userData.safeParse({ name: userDt.name, age: userDt.age, address: userDt.address });
    if (!check.success) return alert('Invalid Inputs');
    dispatch({type: REQUEST});
    sendData(userDt);
  };

  const sendData = async (data) => {
    try {
      if (data.photo) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('age', data.age);
        formData.append('address', data.address);
        formData.append('photo', data.photo);
        const res = await axios.post(`${backendServerUrl}form/submit-form`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: PDF_CREATED, payload: {url: res.data.pdfUrl, name: res.data.pdfName}})
      }else console.log('Photo not found');
    } catch (err) {
      dispatch({type: FAILURE, payload: err.data.Error})
      console.log(err);
    }
  }

  return (
    <div style={styles.userFormContainer}>
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit} style={styles.userForm}>
        <input
          type="text"
          name="name"
          value={userDt.name}
          onChange={handleChange}
          placeholder='Name'
          style={styles.inputboxes}
        />
        <br />

        <input
          style={styles.inputboxes}
          type="number"
          name="age"
          value={userDt.age}
          onChange={handleChange}
          placeholder='Age'
        />
        <br />

        <textarea
          name="address"
          value={userDt.address}
          onChange={handleChange}
          placeholder='Address'
          style={styles.inputboxes}
        />
        <br />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          required
        />
        <br />

        <button type="submit" style={styles.inputboxes}>
          {
            isLoading? 'Loading...': 'Submit'
          }
        </button>
      </form>
    </div>
  );
};

export default UserForm;

const styles = {
  userFormContainer: {
    display: 'flex',
    border: '1px solid black',
    width: 'fit-content',
    flexDirection: 'column',
    padding: '20px'
  },
  userForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputboxes: {
    height: '2.5rem',
    padding: '0 12px'
  }
}
