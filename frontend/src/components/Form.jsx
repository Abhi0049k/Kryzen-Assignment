import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { userData } from '../validations/userData.validation';

const UserForm = () => {
  const token = useSelector(store => store.token);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='age'){
      setFormData({...formData, age: Number(value)})
    }else
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = userData.safeParse({name: formData.name, age: formData.age, address: formData.address});
    console.log(check);
    if(!check.success) return alert('Invalid Inputs');
    sendData(formData);
  };

  const sendData = async(data)=>{
    try{
      console.log(data);
    }catch(err){
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
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
            style={styles.inputboxes}
            />
        <br />

          <input
            style={styles.inputboxes}
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder='Age'
            />
        <br />

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder='Address'
            style={styles.inputboxes}
            />
        <br />
          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleFileChange}
            required
          />
        <br />

        <button type="submit" style={styles.inputboxes}>Submit</button>
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
  userForm:{
    display: 'flex',
    flexDirection: 'column'
  },
  inputboxes: {
    height: '2.5rem',
    padding: '0 12px'
  }
}
