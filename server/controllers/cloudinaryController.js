const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  let result = await cloudinary.upload.uploader(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.removeImages = (req, res) => {
  let imageId = req.body.public_id;
  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.send('Ok');
  });
};
