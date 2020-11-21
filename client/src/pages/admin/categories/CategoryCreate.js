import React, { useEffect, useState } from 'react';
import CategoryCreateForm from '../../../components/Categories/CategoryCreateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/categories';

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await getCategories();
    const { data } = cats;
    setCategories(data);
    console.log(data);
    // getCategories().then((c) => {
    //   setCategories(c.data);
    //   console.log(c.data);
    // });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}

          <CategoryCreateForm loading={loading} setLoading={setLoading} />
          <hr />
          {categories.length}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
