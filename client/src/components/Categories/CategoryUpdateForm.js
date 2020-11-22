import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateCategory } from '../../functions/categories';

const CategoryUpdateForm = ({ setLoading, name, setName, history, slug }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateCategory(slug, { name }, user.token);
      //   console.log(res.data);
      setLoading(false);
      setName('');
      toast.success(`${res.data.name} is Updated successfully`);
      history.push('/admin/category');
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

export default CategoryUpdateForm;
