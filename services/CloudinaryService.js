const cloudinary = require('cloudinary').v2;

const {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName
} = require('../config');

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
});

class CloudinaryService {
  uploadImage(imagePath, folder) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(imagePath, {
          folder
        })
        .then((image) => resolve(image))
        .catch((err) => {
          console.warn(err);
          return reject(err);
        });
    });
  }

  deleteImage(imagePublicId) {
    return new Promise((resolve, reject) => {
      cloudinary.api
        .delete_resources(imagePublicId)
        .then((res) => resolve())
        .catch((err) => {
          console.warn(err);
          return reject(err);
        });
    });
  }
}

module.exports = CloudinaryService;
