import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import {
  getCoupons,
  createCoupons,
  removeCoupons,
} from '../../../functions/coupon';

const CreateCouponPage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Coupons</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
