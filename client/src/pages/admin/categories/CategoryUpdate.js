import React, { useEffect, useState } from 'react';
import CategoryUpdateForm from '../../../components/Categories/CategoryUpdateForm';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategory } from '../../../functions/categories';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const slug = match.params.slug;

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const cats = await getCategory(slug);
    const { data } = cats;
    setName(data.name);
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
            <h4>Update Category</h4>
          )}

          <CategoryUpdateForm
            setLoading={setLoading}
            history={history}
            name={name}
            setName={setName}
            slug={slug}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
