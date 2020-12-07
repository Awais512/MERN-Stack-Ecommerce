import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
    getUserOrders(user.token).then(({ data }) => {
      console.log(data);
      setOrders(data);
    });
  };

  useEffect(() => {
    loadUserOrders();
  }, []);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4>User History Page</h4>
          {JSON.stringify(orders)}
        </div>
      </div>
    </div>
  );
};

export default History;
