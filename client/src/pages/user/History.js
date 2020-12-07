import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserOrderTable from './UserOrderTable';

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  const loadUserOrders = async () => {
    const { data } = await getUserOrders(user.token);
    console.log(data);
    setOrders(data);
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
        <div className='col text-center'>
          <h4>
            {orders.length > 0
              ? `User Purchase Order (${orders.length})`
              : 'No Purchase Orders'}
          </h4>
          {orders.map((order, i) => (
            <div key={i} className='m-5 p-3 card'>
              <p>Show Payment Info</p>
              <UserOrderTable order={order} />
              <div className='row'>
                <div className='col'>
                  <p>PDF Download</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
