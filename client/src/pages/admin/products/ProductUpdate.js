import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/products';
import { getCategories, getCategorySubs } from '../../../functions/categories';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Red'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'Hp', 'Dell'],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        return arr.push(s._id);
      });
      console.log(arr);
      setArrayOfSubIds((prev) => arr);
    });
  };

  const loadCategories = async () => {
    const loadCats = await getCategories();

    setCategories(loadCats.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;
    try {
      const { data } = await updateProduct(slug, values, user.token);
      setLoading(false);
      toast.success(`${data.title} is updated`);
      history.push('/admin/products');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    const res = await getCategorySubs(e.target.value);
    setSubOptions(res.data);

    //Load previous state of category's subcategories
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    //Clear Subcategories when user change parent category
    setArrayOfSubIds([]);
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Product Update</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload
              values={values}
              loading={loading}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            subOptions={subOptions}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
