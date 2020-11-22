import React, { useEffect, useState } from 'react';
import SubcategoriesList from '../../../components/Subcategories/SubcategoriesList';
import SearchCategoriesForm from '../../../components/Categories/SearchCategoriesForm';
import AdminNav from '../../../components/nav/AdminNav';
import SubcategoryForm from '../../../components/Subcategories/SubcategoryForm';
import { getCategories } from '../../../functions/categories';

const Subcategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
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
            <h4>Create Sub category</h4>
          )}

          <div className='form-group'>
            <label>Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select a Category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <SubcategoryForm
            category={category}
            loading={loading}
            setLoading={setLoading}
            loadCategories={loadCategories}
          />

          <SearchCategoriesForm keyword={keyword} setKeyword={setKeyword} />
          {/* {categories.filter(searched(keyword)).map((category) => (
            <SubcategoriesList
              key={category._id}
              category={category}
              setLoading={setLoading}
              loadCategories={loadCategories}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Subcategories;
