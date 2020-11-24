import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import laptop from '../../images/laptop.png';
const { Meta } = Card;

const AdminProductsCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
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
        <EditOutlined className='text-warning' />,
        <DeleteOutlined
          className='text-danger'
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductsCard;
