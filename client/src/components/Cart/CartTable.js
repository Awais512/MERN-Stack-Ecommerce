import React from 'react';
import ModalImage from 'react-modal-image';
import Laptop from '../../images/laptop.png';

const CartTable = ({ cart }) => {
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
          <tr key={p._id}>
            <td>
              <div style={{ width: '100px', height: 'auto' }}>
                {p.images.length ? (
                  <ModalImage
                    small={p.images[0].url}
                    large={p.images[0].url}
                    alt={p.title}
                  />
                ) : (
                  <ModalImage
                    small={Laptop}
                    large={Laptop}
                    alt='Hello World!'
                  />
                )}
              </div>
              ;
            </td>
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
