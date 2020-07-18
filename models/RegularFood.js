const mongoose = require('mongoose');

const RegularFoodScema = mongoose.Schema({
  name: {
    type: String
  },
  // 0: Permitted, 1: Not allowed, 2: Allowed with dosage
  classification: {
    type: Number
  },
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = RegularFood = mongoose.model('regularFood', RegularFoodScema);
