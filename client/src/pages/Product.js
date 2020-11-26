import React, { useEffect, useState } from 'react';
import SingleProduct from '../components/Cards/SingleProduct';
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
  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={product} />
      </div>

      <div className='row'>
        <div>Related products</div>
      </div>
    </div>
  );
};

export default Product;
