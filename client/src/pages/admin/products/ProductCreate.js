import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/products';
import ProductForm from '../../../components/forms/ProductForm';
import { getCategories, getCategorySubs } from '../../../functions/categories';

const ProductCreate = () => {
  const initialState = {
    title: 'Macbook Pro',
    description: 'This is the best Apple product',
    price: '45000',
    categories: [],
    category: '',
    subs: [],
    shipping: 'Yes',
    quantity: '50',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    color: 'White',
    brand: 'Apple',
  };
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const loadCats = await getCategories();
    console.log(loadCats.data);
    setValues({ ...values, categories: loadCats.data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    console.log('Clicked category', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    const res = await getCategorySubs(e.target.value);
    setSubOptions(res.data);
    setShowSub(true);
    console.log(res.data);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Product create</h4>
          <hr />

          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            showSub={showSub}
            subOptions={subOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
