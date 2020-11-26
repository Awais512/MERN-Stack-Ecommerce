import React, { useEffect, useState } from 'react';
import { getProduct } from '../functions/products';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  const loadSingleProduct = async () => {
    const { data } = await getProduct(slug);
    setProduct(data);
    console.log(data);
  };

  useEffect(() => {
    loadSingleProduct(slug);
  }, []);
  return <div>{JSON.stringify(product)}</div>;
};

export default Product;
