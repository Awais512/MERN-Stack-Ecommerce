import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push('/login');
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className='text-danger' style={{ cursor: 'pointer' }} />
        <br />
        {user ? 'Leave Rating' : 'Login to leave rating'}
      </div>
      <Modal
        title='Leave your rating'
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for the review.');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
