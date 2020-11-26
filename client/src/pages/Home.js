import React, { useEffect, useState } from 'react';
import { getProductsByCount } from '../functions/products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    const { data } = await getProductsByCount(1);
    setProducts(data);
    console.log(data);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;
