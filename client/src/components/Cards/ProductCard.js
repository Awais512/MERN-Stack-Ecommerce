import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { showAverage } from '../../functions/rating';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [tooltip, setTooltip] = useState('Click to add');
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

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-3'>No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{ height: '150px', objectFit: 'cover' }}
            className='p-1'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className='text-danger' /> <br />{' '}
              {product.quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
