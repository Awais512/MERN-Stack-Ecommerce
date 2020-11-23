import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>Admin dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
