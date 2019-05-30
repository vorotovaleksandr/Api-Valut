const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
  date:{
    type: String,
  },
  bank:{
    type: String
  },
  baseCurrency:{
    type: String
  },
  baseCurrencyLit:{
    type: String
  },
  exchangeRate:[
    {
      baseCurrency:{
        type: String
      },
      saleRateNB:{
        type: String
      },
      purchaseRateNB:{
        type: String
      },
      currency:{
        type: String
      }

    }],
});


module.exports = mongoose.model('currencys', currencySchema);