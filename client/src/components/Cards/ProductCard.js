import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, slug, images } = product;
  return (
    <Card
      hoverable
      style={{ width: '240' }}
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
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
