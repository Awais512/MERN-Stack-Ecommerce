import React, { useEffect, useState } from 'react';
import AdminProductsCard from '../../../components/Cards/AdminProductsCard';
import AdminNav from '../../../components/nav/AdminNav';

import { getProductsByCount, removeProduct } from '../../../functions/products';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = async (slug) => {
    let answer = window.confirm('Are sure you want to delete?');

    try {
      if (answer) {
        await removeProduct(slug, user.token);
        loadAllProducts();
        toast.error(`Product is deleted`);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error);
        setLoading(false);
        toast.error(error.message);
      }
    }
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
              <div key={product._id} className='col-md-4 pb-3'>
                <AdminProductsCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;