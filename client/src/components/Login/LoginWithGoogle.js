import React, { useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const LoginWithGoogle = ({ history, setLoading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [history, user]);
  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: user.displayName,
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      type='danger'
      icon={<GoogleOutlined />}
      block
      shape='round'
      className='mb-3'
      size='large'
    >
      Login with Google
    </Button>
  );
};

export default LoginWithGoogle;
