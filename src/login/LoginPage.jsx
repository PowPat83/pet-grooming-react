import React, { useState } from 'react';
// useSelector to select from the global state
// dispatch our action like register
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from './loginSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO create spinner component

function LoginPage(props) {
  //   const [userId, setUserId] = useState('');
  //   const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    userID: '',
    password: '',
  });

  const { userID, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userID: loggedInUser,
    isSuccess,
    role,
    // use useSelector((state) => state.login)
  } = useSelector(({ login }) => login);

  useEffect(() => {
    if (isSuccess || loggedInUser) {
      navigate('/');
    }
    // has status dependency
    dispatch(reset());
  }, [isSuccess, navigate, dispatch, loggedInUser, role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userForm = {
      userID: userID,
      password: password,
    };

    dispatch(login(userForm));
  };

  const onChange = (e) => {
    // object hence put inside curly braces
    setFormData((prevState) => ({
      // all the other fields
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // setUserId(e.target.value);
  };
  return (
    <div className='auth-form-conatiner'>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='userID'>UserID</label>
        <input
          //   value={userId}
          //   onChange={(e) => setUserId(e.target.value)}
          placeholder='youremail@gmail.com'
          id='userID'
          // set the same variable name as state
          name='userID'
          value={userID}
          onChange={onChange}
        />
        <label htmlFor='password'>Password </label>
        <input
          value={password}
          onChange={onChange}
          // onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='*******'
          id='password'
          name='password'
        />
        <button type='submit'>Log In</button>
      </form>
      <button
        className='link-btn'
        onClick={() => props.onFormSwitch('register')}
      >
        No account? Register here.
      </button>
    </div>
  );
}
export default LoginPage;
