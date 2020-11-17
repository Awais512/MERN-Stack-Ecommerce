import React, { useState, useEffect } from 'react';

import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendPasswordResetEmail(email, config);
      setEmail('');
      setLoading(false);
      toast.success('Password Reset Link has been sent to your email');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='container col-md-6 offset-md-3 p-5'>
      {loading ? (
        <h4 className='text-danger'>Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            className='form-control'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <br />
          <button className='btn btn-raised' disabled={!email}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
