import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
import { showAverage } from '../../functions/rating';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, slug, images, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-1'>No ratings yet</div>
      )}
      <Card
        hoverable
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            className='p-1'
            style={{ height: '150px', objectFit: 'cover' }}
            alt={title}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined
              className='text-danger'
              //   onClick={() => handleRemove(slug)}
            />
            <br /> Add to Cart
          </>,
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
