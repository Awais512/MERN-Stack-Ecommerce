import React, { useEffect, useState } from 'react';
import AdminProductsCard from '../../components/Cards/AdminProductsCard';
import AdminNav from '../../components/nav/AdminNav';

import { getProductsByCount } from '../../functions/products';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4'>
                <AdminProductsCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
