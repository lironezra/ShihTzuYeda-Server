const mongoose = require('mongoose');

const DryFoodScema = mongoose.Schema({
  // Image path from the upload computer
  imagePath: {
    type: String
  },
  // Cloudinary image URL - we get it after uploading resource to cloud
  imageUrl: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  // Url to product info on their website
  productInfo: {
    type: String
  },
  company: {
    type: String
  },
  // Chicken: 0, Fish: 1, Lamb: 2, Duck: 3, Beef: 4, Bison: 5, Venision: 6, Red Meat: 7, Boar: 8
  protein: {
    type: Number
  },
  // Puppy: 0, Adult: 1, Senior: 2, All: 3
  lifeStage: {
    type: Number
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = DryFood = mongoose.model('dryFood', DryFoodScema);
