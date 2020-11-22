import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeSub } from '../../functions/subcategories';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CategoriesList = ({ subcategory, setLoading, loadSubCategories }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      try {
        const res = await removeSub(slug, user.token);
        setLoading(false);
        toast.error(`${res.data.name} deleted successfully`);
        loadSubCategories();
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
      {subcategory.name}
      <span
        onClick={() => handleRemove(subcategory.slug)}
        className='btn btn-sm float-right'
      >
        <DeleteOutlined className='text-danger' />
      </span>
      <Link to={`/admin/sub/${subcategory.slug}`}>
        <span className='btn btn-sm float-right'>
          <EditOutlined className='text-warning' />
        </span>
      </Link>
    </div>
  );
};

export default CategoriesList;
