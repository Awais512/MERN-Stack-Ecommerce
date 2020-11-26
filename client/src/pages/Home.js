import React, { useEffect, useState } from 'react';
import Jumbotron from '../components/Cards/Jumbotron';
import ProductCard from '../components/Cards/ProductCard';
import { getProductsByCount } from '../functions/products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    setLoading(true);
    const { data } = await getProductsByCount(6);
    setLoading(false);
    setProducts(data);
    console.log(data);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Jumbotron
            text={['Latest Products', 'New Arrivals', 'Best Sellers']}
          />
        )}
      </div>
      <div className='container'>
        <div className='row'>
          {products.map((product) => (
            <div key={product._id} className='col-md-4'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
