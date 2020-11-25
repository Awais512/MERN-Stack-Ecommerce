import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
}) => {
  //Destructuring the props
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

  return (
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
            className='form-control'
            onChange={handleChange}
          >
            <option>Please select</option>
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Color</label>
          <select name='color' onChange={handleChange} className='form-control'>
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
          <select name='brand' onChange={handleChange} className='form-control'>
            <option value=''>Please Select a Brand</option>
            {brands.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>
        {/* <div className='form-group'>
          <label>Category</label>
          <select
            name='category'
            className='form-control'
            onChange={handleCategoryChange}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div> */}
      </div>
      {/* {showSub && (
        <div>
          <label>Subcategories</label>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Please Select the values'
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((subOption) => (
                <Option key={subOption._id} value={subOption._id}>
                  {subOption.name}
                </Option>
              ))}
          </Select>
        </div>
      )} */}
      <br />
      <button className='btn btn-outline-info'>Save</button>
    </form>
  );
};

export default ProductUpdateForm;
