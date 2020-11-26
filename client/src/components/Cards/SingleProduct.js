import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const { Meta } = Card;

const SingleProduct = ({ product: { title, description, images, slug } }) => {
  return (
    <>
      <div className='col-md-7'>
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((img) => (
              <img src={img.url} key={img.public_id} alt={title} />
            ))}
        </Carousel>
      </div>

      <div className='col-md-5'>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> <br />
              Add to Cart
            </>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>
            price/category/subs/shipping/color/brand/quantity available/sold
          </p>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
