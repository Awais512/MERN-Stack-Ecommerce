import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 className='text-danger'>You are not Authorized to view this page</h1>
  );
};

export default UserRoute;
