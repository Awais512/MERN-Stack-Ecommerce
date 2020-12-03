import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CartTable = () => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  return (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((p) => (
          <tr>
            <td>Image</td>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>{p.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>Shipping Icon</td>
            <td>Remove Icon</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
