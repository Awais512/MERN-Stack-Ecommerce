import React from 'react';

const ShowPaymentInfo = ({ order }) => {
  return (
    <div>
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Order Id</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Currency</th>
            <th scope='col'>Payment Method</th>
            <th scope='col'>Payment</th>
            <th scope='col'>Date</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.paymentIntent.id}</td>
            <td>
              {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>

            <td>{order.paymentIntent.currency.toUpperCase()}</td>
            <td>{order.paymentIntent.payment_method_types[0]}</td>
            <td>{order.paymentIntent.status.toUpperCase()}</td>
            <td>
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </td>
            <td className='badge bg-primary text-white mt-2'>
              {order.orderStatus}
            </td>
          </tr>
        </tbody>
      </table>
      {/* <p>
        <span>Order Id: {order.paymentIntent.id}</span>{' '}
        <span>
          Amount:{' '}
          {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>{' '}
        <span>Currency: {order.paymentIntent.currency.toUpperCase()} </span>{' '}
        <span>Method: {order.paymentIntent.payment_method_types[0]} </span>{' '}
        <span>Payment: {order.paymentIntent.status.toUpperCase()} </span>{' '}
        <span>
          Date: {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>{' '}
        <span>Status: {order.orderStatus}</span>
      </p> */}
    </div>
  );
};

export default ShowPaymentInfo;
