import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userData } from '../validations/userData.validation';
import { FAILURE, PDF_CREATED, REQUEST } from '../redux/actionTypes';
const backendServerUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const UserForm = () => {
  const { isLoading, token } = useSelector(store => store);
  const dispatch = useDispatch()
  const [userDt, setuserDt] = useState({
    name: '',
    age: '',
    address: '',
    photo: null,
    n: 0,
    selection: ''
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
    const check = userData.safeParse({ name: userDt.name, age: userDt.age, address: userDt.address, n: userDt.n, selection: userDt.selection });
    if (!check.success) return alert('Invalid Inputs');
    dispatch({ type: REQUEST });
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
        formData.append('n', data.n);
        formData.append('selection', data.selection);
        const res = await axios.post(`${backendServerUrl}form/submit-form`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({ type: PDF_CREATED, payload: { name: res.data.name, age: res.data.age, address: res.data.address, photoUrl: res.data.securePhotoUrl} })
      } else console.log('Photo not found');
    } catch (err) {
      alert('Something went wrong while submitting the form. Please try again later.')
      dispatch({ type: FAILURE, payload: err.response.data.Error })
      console.log(err);
    }
  }

  const handleNumChange = (e)=>{
    const val = Number(e.target.value);
    setuserDt({...userDt, n: val});
  }

  const handleSelectChange = (e)=>{
    const val = e.target.value;
    setuserDt({...userDt, selection: val});
  }

  return (
    <div style={styles.formContainer}>
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
          <input type="number" name="n" onChange={handleNumChange} value={userDt.n}/>
          <select name="options" onChange={handleSelectChange}>
            <option value="">Select</option>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
          </select>

          <button type="submit" style={styles.inputboxes}>
            {
              isLoading ? 'Loading...' : 'Submit'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

const styles = {
  formContainer: {
    paddingTop: '3rem',
    width: '50%',
    display: 'flex',
    justifyContent: 'center'
  },
  userFormContainer: {
    display: 'flex',
    border: '1px solid black',
    width: 'fit-content',
    height: 'fit-content',
    flexDirection: 'column',
    padding: '20px',
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
