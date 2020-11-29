import React, { useEffect, useState } from 'react';
import {
  getProduct,
  getRelatedProducts,
  productStar,
} from '../functions/products';
import SingleProduct from '../components/Cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/Cards/ProductCard';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      //Load Related Products
      getRelatedProducts(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = async (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    const { data } = await productStar(name, newRating, user.token);
    console.log(data);
    loadSingleProduct(); // if you want to show updated rating in real time
    // productStar(name, newRating, user.token).then((res) => {
    //   console.log('rating clicked', res.data);
    // });
  };

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related Products</h4>

          <hr />
        </div>
      </div>
      <div className='row pb-5'>
        {related.length ? (
          related.map((relate) => (
            <div key={relate._id} className='col-md-4'>
              <ProductCard product={relate} />
            </div>
          ))
        ) : (
          <div className='text-center col'>No Related Products found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
