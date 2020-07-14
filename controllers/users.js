const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { jwtSecret, adminEmails } = require('../config');

const signToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id
      }
    },
    jwtSecret,
    { expiresIn: 3600 }
  );
};

module.exports = {
  signUp: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // See if user already exists
      let existingUser = await User.findOne({ 'local.email': email });

      if (existingUser)
        return res.status(400).json({ msg: 'User already exsits' });

      // See if user with facebook authentication exists
      existingUser = await User.findOne({ 'facebook.email': email });

      if (existingUser) {
        const token = signToken(existingUser);

        //Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate password hash
        const passwordhash = await bcrypt.hash(password, salt);

        // merge local's data with facebook auth
        existingUser.methods = [...existingUser.methods, 'local'];

        existingUser.local = {
          email,
          password: passwordhash
        };

        await existingUser.save();
        return res.status(200).json({ token });
      }

      //Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Generate password hash
      const passwordhash = await bcrypt.hash(password, salt);

      const newUser = new User({
        methods: 'local',
        isAdmin: adminEmails.indexOf(email) !== -1,
        name,
        local: {
          email,
          password: passwordhash
        }
      });

      await newUser.save();

      // Sign a token
      const token = signToken(newUser);

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  signIn: async (req, res, next) => {
    // Sign a token
    const token = signToken(req.user);

    return res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select({
        'local.password': 0
      });
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
  facebookOAuth: async (req, res, next) => {
    // Sign a token
    const token = signToken(req.user);

    return res.status(200).json({ token });
  }
};
