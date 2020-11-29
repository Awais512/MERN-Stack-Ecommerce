import React, { useEffect, useState } from 'react';
import { getCategory } from '../../functions/categories';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Cards/ProductCard';
import Product from '../Product';

const CategoryHome = ({ match }) => {
  const { slug } = match.params;
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then(({ data }) => {
      console.log(JSON.stringify(data, null, 4));
      setCategory(data.category);
      setProducts(data.products);
      setLoading(false);
    });
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              Loading...
            </h4>
          ) : (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              "{products.length}" products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
      <div className='row'>
        {products.map((product) => (
          <div className='col-md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
