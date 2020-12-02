import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };
  return (
    <div className='container-fluid pt-2'>
      <div className='row'>
        <div className='col-md-8'>
          <h4>Cart/ {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No items in the cart <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            'Show cart Items'
          )}
        </div>
        <div className='col-md-4'>
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button className='btn btn-small btn-primary mt-2 btn-raised'>
              Proceed to Checkout
            </button>
          ) : (
            <button className='btn btn-small btn-primary mt-2 btn-raised'>
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
