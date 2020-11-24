import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/products';
import ProductForm from '../../../components/forms/ProductForm';
import { getCategories, getCategorySubs } from '../../../functions/categories';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const ProductUpdate = () => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Product Update</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
