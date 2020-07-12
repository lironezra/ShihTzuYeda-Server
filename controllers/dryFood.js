const DryFood = require('../models/DryFood');

module.exports = {
  addDryFood: async (req, res) => {
    const { imageUrl, productInfo, company, protein, lifeStage } = req.body;

    const newDryFood = new DryFood({
      imageUrl,
      productInfo,
      company,
      protein,
      lifeStage
    });

    try {
      await newDryFood.save();

      res.status(200).json(newDryFood);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};
