import React, { useEffect, useState } from 'react';
import CategoriesList from '../../../components/Categories/CategoriesList';
import CategoryCreateForm from '../../../components/Categories/CategoryCreateForm';
import SearchCategoriesForm from '../../../components/Categories/SearchCategoriesForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/categories';

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const cats = await getCategories();
    const { data } = cats;
    setCategories(data);
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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

          <CategoryCreateForm
            loading={loading}
            setLoading={setLoading}
            loadCategories={loadCategories}
          />

          <SearchCategoriesForm keyword={keyword} setKeyword={setKeyword} />
          {categories.filter(searched(keyword)).map((category) => (
            <CategoriesList
              key={category._id}
              category={category}
              setLoading={setLoading}
              loadCategories={loadCategories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
