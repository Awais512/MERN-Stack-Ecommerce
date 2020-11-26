import React, { useEffect, useState } from 'react';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import { getProducts } from '../../functions/products';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts('sold', 'desc', 3);
      setLoading(false);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <>
      <div className='container'>
        {loading ? (
          <LoadingCard key={1} count={3} />
        ) : (
          <div className='row'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSellers;
