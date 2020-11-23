import React, { useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrUpdateUser } from '../../functions/auth';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    color,
    colors,
    brand,
    brands,
  } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {};
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Product Create</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                className='form-control'
                value={description}
                onChange={handleChange}
              />

              <div className='form-group'>
                <label>Price</label>
                <input
                  type='number'
                  name='price'
                  className='form-control'
                  value={price}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Quantity</label>
                <input
                  type='number'
                  name='quantity'
                  className='form-control'
                  value={quantity}
                  onChange={handleChange}
                />
              </div>

              <div className='form-group'>
                <label>Shipping</label>
                <select
                  name='shipping'
                  onChange={handleChange}
                  className='form-control'
                >
                  <option value='No'>No</option>
                  <option value='Yes'>Yes</option>
                </select>
              </div>

              <div className='form-group'>
                <label>Color</label>
                <select
                  name='color'
                  onChange={handleChange}
                  className='form-control'
                >
                  <option value=''>Please Select a Color</option>
                  {colors.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Brand</label>
                <select
                  name='brand'
                  onChange={handleChange}
                  className='form-control'
                >
                  <option value=''>Please Select a Brand</option>
                  {brands.map((br) => (
                    <option key={br} value={br}>
                      {br}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
