import React, { useEffect, useState } from 'react';
import { getProductsByCount } from '../functions/products';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/Cards/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    const { data } = await getProductsByCount(12);
    setProducts(data);
    setLoading(false);
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>Search filter menu</div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}
          {products.length < 1 && (
            <p>We didn't find any products related to your query</p>
          )}
          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
