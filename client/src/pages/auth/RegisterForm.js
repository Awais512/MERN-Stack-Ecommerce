import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const RegisterForm = ({ history }) => {
  const [email, setEmail] = useState('');

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email has been sent to ${email}. Click the link to complete your registration`
    );

    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        className='form-control'
        onChange={onChangeHandler}
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
