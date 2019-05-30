const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltWork = 10;

const userSchema = new Schema({
  name:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.pre('save', function (next) {
  const user = this;  
  // generate a salt
  bcrypt.genSalt(saltWork, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();

    });
  });
});

module.exports = mongoose.model('users', userSchema);