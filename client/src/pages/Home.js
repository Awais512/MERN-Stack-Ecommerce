import React, { useEffect, useState } from 'react';
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
      <div className='jumbotron'>
        {loading ? <h1>Loading...</h1> : <h1>All Products</h1>}
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
