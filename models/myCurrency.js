const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myCurrencySchema = new Schema({
  value:{
    type: String,
  },
  email:{
    type: String
  },
});


module.exports = mongoose.model('myCurrencys', myCurrencySchema);