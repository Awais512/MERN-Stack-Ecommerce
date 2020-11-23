import React from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('CLOUDINARY UPLOAD ERROR', err);
              });
          },
          'base64'
        );
      }
    }
  };

  return (
    <>
      <div className='row'>
        {values.images &&
          values.images.map((img) => (
            <Avatar
              key={img.public_id}
              src={img.url}
              size={100}
              className='m-3'
            />
          ))}
      </div>
      <div className='row'>
        <label className='btn btn-primary btn-raised'>
          Choose File
          <input
            type='file'
            multiple
            accept='images/*'
            onChange={fileUploadAndResize}
            hidden
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
