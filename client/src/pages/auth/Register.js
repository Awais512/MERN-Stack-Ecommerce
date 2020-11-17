import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';

const Register = ({ history }) => {
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <RegisterForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default Register;
