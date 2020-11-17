import React, { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Login</h4>}

          <LoginForm history={history} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
