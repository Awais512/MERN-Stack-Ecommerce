import React, { useEffect, useState } from 'react';
import { getCategory } from '../../functions/categories';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Cards/ProductCard';

const CategoryHome = ({ match }) => {
  const { slug } = match.params;
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then(({ data }) => {
      console.log(JSON.stringify(data, null, 4));
      setCategory(data);
    });
  }, []);
  return (
    <div>
      <p>{slug}</p>
    </div>
  );
};

export default CategoryHome;
