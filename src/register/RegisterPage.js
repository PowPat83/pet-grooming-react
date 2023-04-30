import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../login/loginSlice';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function RegisterPage(props) {
  // const [email, setEmail] = useState('');
  // const [pass, setPass] = useState('');
  // const [name, setName] = useState('');

  const [formData, setFormData] = useState({
    userID: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const testOptions = [{ name: '123' }, { name: '456' }, { name: '769' }];

  const { userID, password, phoneNumber, role } = formData;

  // dispatch any function
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // bring in pieces of our state
  // bring in the name based on the slice name in store.js
  // so i can use the registeredUser instead of userId which clashes with my component state
  const { isSuccess } = useSelector(({ login }) => login);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    // has status dependency
    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userForm = {
      userID: userID,
      password: password,
      phoneNumber: phoneNumber,
      role: role,
    };
    // call register function in slice
    dispatch(register(userForm));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='auth-form-conatiner'>
      <form className='register-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={userID}
          onChange={onChange}
          // onChange={(e) => setEmail(e.target.value)}
          placeholder='youremail@gmail.com'
          id='userID'
          // name has to be the same as the state
          name='userID'
        />
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={onChange}
          // onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='*******'
          id='password'
          name='password'
        />
        <label htmlFor='name'>Phone Number</label>
        <input
          value={phoneNumber}
          onChange={onChange}
          name='phoneNumber'
          id='phoneNumber'
          placeholder='Contact Number'
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              defaultValue=''
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={role}
              label='Role'
              name='role'
              onChange={onChange}
            >
              <MenuItem value='pet owner'>Pet Owner</MenuItem>
              <MenuItem value='service provider'>Service Provider</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <button type='submit'>Sign up</button>
      </form>
      <button className='link-btn' onClick={() => props.onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  );
}
export default RegisterPage;
