const RegularFood = require('../models/RegularFood');
const CloudinaryService = require('../services/CloudinaryService');

module.exports = {
  addRegularFood: async (req, res) => {
    const cloudibaryService = new CloudinaryService();
    const { imagePath, name, classification } = req.body;

    try {
      const image = await cloudibaryService.uploadImage(
        imagePath,
        'shih-tzu-yeda/regular-food'
      );

      const newRegularFood = new RegularFood({
        imageUrl: `${image.url.substr(0, 49)}q_auto${image.url.substr(48)}`,
        imagePublicId: image.public_id,
        name,
        classification
      });

      await newRegularFood.save();

      res.status(200).json(newRegularFood);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getAllRegularFoods: async (req, res) => {
    try {
      const foods = await RegularFood.find().sort('classification');

      res.status(200).send(foods);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
  getRegularFoodById: async (req, res) => {
    try {
      const food = await RegularFood.findById(req.params.id);

      if (!food) {
        return res.status(400).json({ msg: 'Regular food no found' });
      }

      res.status(200).json(food);
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Regular food no found' });
      }

      res.status(500).send('Server Error');
    }
  },
  deleteRegularFood: async (req, res) => {
    const cloudibaryService = new CloudinaryService();
    try {
      const food = await RegularFood.findById(req.params.id);

      if (!food) {
        return res.status(400).json({ msg: 'Regular food no found' });
      }

      await cloudibaryService.deleteImage(food.imagePublicId);
      await food.remove();

      res.status(200).json({ msg: 'Regular food removed' });
    } catch (err) {
      console.error(err.message);

      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Dry food no found' });
      }

      res.status(500).send('Server Error');
    }
  }
};
