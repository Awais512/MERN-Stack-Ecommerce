import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoginWithGoogle from './LoginWithGoogle';
import axios from 'axios';

const createOrUpdateUser = async (authtoken) => {
  const config = {
    headers: {
      authtoken,
    },
  };

  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    config
  );
};

const LoginForm = ({ history, setLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      console.log('Create or update user response', res);

      // dispatch({
      //   type: 'LOGGED_IN_USER',
      //   payload: {
      //     email: user.email,
      //     token: idTokenResult.token,
      //   },
      // });
      // history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            className='form-control'
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder='Enter Your Email'
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            value={password}
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Your Password'
          />
        </div>
        <br />
        <Button
          onClick={handleSubmit}
          type='primary'
          icon={<MailOutlined />}
          block
          shape='round'
          className='mb-3'
          size='large'
          disabled={!email || password.length < 6}
        >
          Login with Email and Password
        </Button>

        <LoginWithGoogle history={history} setLoading={setLoading} />

        <Link to='/forgot/password' className='float-right text-danger'>
          Forgot Password
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
