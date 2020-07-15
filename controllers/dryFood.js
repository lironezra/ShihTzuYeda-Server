const DryFood = require('../models/DryFood');
const cloudinary = require('cloudinary').v2;

const {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName
} = require('../config.js');

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
});

module.exports = {
  addDryFood: (req, res) => {
    const { productInfo, company, protein, lifeStage, imagePath } = req.body;

    try {
      // Image upload
      cloudinary.uploader
        .upload(imagePath, {
          folder: 'shih-tzu-yeda/dryFood'
        })
        .then(async (image) => {
          const newDryFood = new DryFood({
            imageUrl: `${image.url.substr(0, 49)}q_auto${image.url.substr(48)}`,
            imagePublicId: image.public_id,
            productInfo,
            company,
            protein,
            lifeStage
          });

          await newDryFood.save();

          res.status(200).json(newDryFood);
        })
        .catch((err) => {
          console.warn(err);
          res.status(500).send('Cloaudinary uploader error: ', err);
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getAllDryFoods: async (req, res) => {
    try {
      const foods = await DryFood.find().sort('company');

      res.status(200).send(foods);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getDryFodById: async (req, res) => {
    try {
      const food = await DryFood.findById(req.params.id);

      if (!food) {
        return res.status(400).json({ msg: 'Dry food no found' });
      }

      res.status(200).json(food);
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Dry food no found' });
      }

      res.status(500).send('Server Error');
    }
  },
  deleteDryFood: async (req, res) => {
    try {
      const food = await DryFood.findById(req.params.id);

      if (!food) {
        return res.status(400).json({ msg: 'Dry food no found' });
      }

      cloudinary.api
        .delete_resources(food.imagePublicId)
        .then(async (result) => {
          console.log(result);
          await food.remove();

          res.status(200).json({ msg: 'Dry food removed' });
        })
        .catch((err) => {
          console.warn(err);
          res.status(500).send('Cloaudinary delete image error: ', err);
        });
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Dry food no found' });
      }

      res.status(500).send('Server Error');
    }
  },
  likeADryFood: async (req, res) => {
    try {
      const food = await DryFood.findById(req.params.id);

      // Check if post has already been liked
      if (
        food.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Dry food already liked' });
      }

      food.likes.unshift({ user: req.user.id });

      await food.save();

      res.status(200).json(food.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  unlikeADryFood: async (req, res) => {
    try {
      const food = await DryFood.findById(req.params.id);

      // Check if post has already been liked
      if (
        food.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: 'Dry food already liked' });
      }

      // Get the remove index
      const removeIdex = food.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      food.likes.splice(removeIdex, 1);

      await food.save();

      res.status(200).json(food.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};
