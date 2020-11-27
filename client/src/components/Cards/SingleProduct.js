import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, description, _id } = product;
  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((img) => (
                <img src={img.url} key={img.public_id} alt={title} />
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
            Call us on +92311634444 to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        <StarRatings
          name={_id}
          numberOfStars={5}
          starRatedColor='red'
          rating={2}
          changeRating={(newRating, name) => console.log(newRating, name)}
          isSelectable={true}
        />

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
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
