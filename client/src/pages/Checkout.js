import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../functions/user';

const Checkout = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserCart(user.token).then(({ data }) => {
      console.log(data.products);
      setProducts(data.products);
      setTotal(data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {};
  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delievery Address</h4>
        <br />
        <br />
        Textarea
        <button
          className='btn btn-primary mt-2 btn-raised'
          onClick={saveAddressToDb}
        >
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input button
      </div>
      <div className='col-md-6'>
        <h4>Order summary</h4>
        {JSON.stringify(total)}
        {JSON.stringify(products)}
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of Products</p>
        <hr />
        <p>Cart Total: $x</p>
        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary btn-raised'>Place Order</button>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-primary btn-raised'>Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
