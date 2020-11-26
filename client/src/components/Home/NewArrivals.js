import React, { useEffect, useState } from 'react';
import LoadingCard from '../Cards/LoadingCard';
import ProductCard from '../Cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/products';
import { Pagination } from 'antd';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts('createdAt', 'desc', page);
      setLoading(false);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
      .then(({ data }) => {
        setProductsCount(data);
      })
      .catch((err) => console.log(err));
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

      <div className='row'>
        <nav className='col-md-4 offset-md-4 text-center pt-2 p-3'>
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
