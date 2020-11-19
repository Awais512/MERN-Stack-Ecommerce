import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.currentUser.updatePassword(password);
      setLoading(false);
      setPassword('');
      toast.success('Password Updated Successfully');
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Your Password</label>
              <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                className='form-control'
                placeholder='Enter new Password'
                disabled={loading}
                value={password}
              />
            </div>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={!password || password.length < 6 || loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
