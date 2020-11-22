import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSub } from '../../functions/subcategories';

const SubcategoryForm = ({ setLoading, category }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createSub({ name, parent: category }, user.token);
      setLoading(false);
      setName('');
      toast.success(`${res.data.name} is created successfully`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
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

export default SubcategoryForm;
