import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const AdminProductsCard = ({ product }) => {
  const { title, description, images } = product;
  return (
    <Card
      hoverable
      style={{ width: '240' }}
      cover={
        <img
          src={images && images.length ? images[0].url : ''}
          className='p-1'
          style={{ height: '150px', objectFit: 'cover' }}
          alt={title}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductsCard;
