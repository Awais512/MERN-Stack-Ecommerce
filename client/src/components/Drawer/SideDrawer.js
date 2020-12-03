import React from 'react';
import { Button, Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.png';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      className='text-center'
      title={`Cart / ${cart.length} Products`}
      placement='right'
      closable={false}
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            {p.images[0] ? (
              <>
                <img
                  src={p.images[0].url}
                  alt={p.title}
                  style={{ width: '100%', height: '50px', objectFit: 'cover' }}
                />
                <p className='text-center bg-secondary text-light'>
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <img
                src={laptop}
                alt={p.title}
                style={{ width: '100%', height: '50px', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <Button
          className='text-center btn btn-primary btn-raised btn-block'
          onClick={() => {
            dispatch({
              type: 'SET_VISIBLE',
              payload: false,
            });
          }}
        >
          Go to cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
