const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');
const errorHandler = require('../routes/utils/errorHandler');

module.exports.login = async (req, res) => {
  console.log('req.body', req.body);
  // const test = JSON.parse(req.body);
  const candidate = await User.findOne({
    email: req.body.email
  });
  if (candidate) {
    //check password
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // generation token
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {
        expiresIn: 60 * 60
      });
      res.status(201).json({
        token
      })
    } else {
      res.status(401).json({
        message: 'User un authorize.'
      })
    }
  } else {
    // user not found, alert
    res.status(404).json({
      message: 'user not found'
    })
  }
};
module.exports.register = async (req, res) => {
  //email password
  const candidate = await User.findOne({
    email: req.body.email
  });
  if (candidate) {
    //user use again
    res.status(409).json({
      message: 'such an email is already taken'
    })
  } else {
    // created use
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      await user.save();
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
};
module.exports.get = async (req, res) => {
  //email password
  const candidate = await User.findOne({
    email: req.body.email
  });
  if (candidate) {
    res.status(201).json(candidate)
  }
};
module.exports.update = async (req, res) => {
  //email password
  const updated = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const todo = await User.findOneAndUpdate({
      email: req.body.defEmail,
    }, {
      $set: updated
    });
    res.status(200).json(todo)
  } catch (e) {
    errorHandler(res, e)
  }

};