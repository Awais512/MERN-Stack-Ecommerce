import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';

const Whishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadWishlist = async () => {
    const { data } = await getWishlist(user.token);
    setWishlist(data.wishlist);
    console.log(data.wishlist);
  };

  const handleRemove = async (productId) => {
    await removeWishlist(productId, user.token);
    loadWishlist();
  };

  useEffect(() => {
    loadWishlist();
  }, []);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col'>
          <h4>Wishlist</h4>
          {wishlist.map((wish) => (
            <div className='alert alert-secondary' key={wish._id}>
              <Link to={`/product/${wish.slug}`}>{wish.title}</Link>
              <span
                onClick={() => handleRemove(wish._id)}
                className='btn btn-small float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whishlist;
