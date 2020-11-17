import { auth } from 'firebase';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CompleteRegistrationForm = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please Enter your Email');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be atleast 6 characters');
      return;
    }

    try {
      const result = await auth().signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);

      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth().currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdToken();
        // console.log('user', user, 'token', idTokenResult);
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='email' value={email} className='form-control' disabled />
        <input
          type='password'
          value={password}
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder='Enter your Password'
        />
        <button type='submit' className='btn btn-raised'>
          Complete Registration
        </button>
      </form>
    </div>
  );
};

export default CompleteRegistrationForm;
