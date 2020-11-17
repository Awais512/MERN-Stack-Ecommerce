import React from 'react';
import CompleteRegistrationForm from './CompleteRegistrationForm';

const RegisterComplete = () => {
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          <CompleteRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
