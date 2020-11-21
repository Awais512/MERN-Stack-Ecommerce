import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeCategory } from '../../functions/categories';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CategoriesList = ({ category, setLoading, loadCategories }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      try {
        const res = await removeCategory(slug, user.token);
        setLoading(false);
        toast.success(`${res.data.name} deleted successfully`);
        loadCategories();
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error);
          setLoading(false);
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <div className='alert alert-secondary'>
      {category.name}
      <span
        onClick={() => handleRemove(category.slug)}
        className='btn btn-sm float-right'
      >
        <DeleteOutlined className='text-danger' />
      </span>
      <Link to={`/admin/category/${category.slug}`}>
        <span className='btn btn-sm float-right'>
          <EditOutlined className='text-warning' />
        </span>
      </Link>
    </div>
  );
};

export default CategoriesList;
