import React from 'react';
import UserNav from '../../components/nav/UserNav';

const Whishlist = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>Whishlist Page</div>
      </div>
    </div>
  );
};

export default Whishlist;
