import React from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../functions/products';

const ProductCreate = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h1>Product Create</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
