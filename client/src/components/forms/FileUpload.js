import React from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading, loading }) => {
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

  const handlrImageRemove = async (public_id) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      );
      setLoading(false);
      const { images } = values;
      let filteredImages = images.filter((item) => {
        return item.public_id !== public_id;
      });
      setValues({ ...values, images: filteredImages });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='row'>
        {values.images &&
          values.images.map((img) => (
            <Badge
              count='X'
              key={img.public_id}
              onClick={() => handlrImageRemove(img.public_id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                src={img.url}
                size={100}
                className='ml-3'
                shape='square'
              />
            </Badge>
          ))}
      </div>

      <div className='row mt-3'>
        <label className='btn btn-primary btn-raised'>
          Choose File
          <input
            disabled={loading}
            type='file'
            multiple
            accept='images/*'
            onChange={fileUploadAndResize}
            hidden
          />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
