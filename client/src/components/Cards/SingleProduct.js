import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../Modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const { title, images, description, _id } = product;

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Added');
      //Save to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      //Show cart items to sidedrawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={title} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className='mb-3 card-image' alt={title} />}
          ></Card>
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className='text-center pt-1 pb-1'>No ratings yet</div>
        )}

        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                  <ShoppingCartOutlined className='text-success' />
                </a>
                <br /> {product.quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
              </Tooltip>
            </>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='red'
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
