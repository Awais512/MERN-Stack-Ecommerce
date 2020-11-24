import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';

import { getProductsByCount } from '../../functions/products';

const Dashboard = () => {
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductsCount = async () => {
      setLoading(true);
      try {
        const res = await getProductsByCount(100);
        setProducts(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getProductsCount();
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        {loading ? (
          <h4 className='text-danger'>Loading...</h4>
        ) : (
          <h4>All Products</h4>
        )}
        <div className='col'>{JSON.stringify(products)}</div>
      </div>
    </div>
  );
};

export default Dashboard;
