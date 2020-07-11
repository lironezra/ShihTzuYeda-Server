const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET
};
