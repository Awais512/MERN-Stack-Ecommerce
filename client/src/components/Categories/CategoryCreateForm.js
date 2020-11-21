import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../functions/categories';

const CategoryCreateForm = ({ loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createCategory({ name }, user.token);
      console.log(res.data);
      setLoading(false);
      setName('');
      toast.success(`${res.data.name} is created successfully`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }

    // .then((res)=>{
    //     setLoading(false)
    //     setName('')
    //     toast.success(``)
    // })
    // .catch()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='form-control'
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Save</button>
    </form>
  );
};

export default CategoryCreateForm;
