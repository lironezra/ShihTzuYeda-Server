const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  methods: {
    type: [String],
    enum: ['local', 'facebook'],
    required: true
  },
  name: {
    type: String
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: false
    }
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = User = mongoose.model('user', UserSchema);
