import React from 'react';
import CompleteRegistrationForm from '../../components/Register/CompleteRegistrationForm';

const RegisterComplete = ({ history }) => {
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <CompleteRegistrationForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
