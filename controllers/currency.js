const Currency = require('../models/currency');
const errorHandler = require('../routes/utils/errorHandler');
const request = require('request-promise');
const defaultDate = new Date().toISOString().slice( 0, 10 );
let i=0;

module.exports.add = async (req, res) => {
  const dateUpdate =  Currency.find({
    date: defaultDate
  });
  if(dateUpdate){
    for(i=0; i < 31; i++){
      let maxDateTime = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      let grip= [maxDateTime[8],maxDateTime[9],'.',maxDateTime[5],maxDateTime[6],'.',maxDateTime[0],maxDateTime[1],maxDateTime[2],maxDateTime[3]];
      let cro = grip.join('');
      request({
      method: 'GET',
        uri: `https://api.privatbank.ua/p24api/exchange_rates?json&date=${cro}`
      })
        .then(function (response){
          console.log('-----currency', response);
          const currency = new Currency(
            response
          );
          console.log('-----currency', response);
          currency.save();
          res.status(201).json(currency)
        })
        .catch((err) => {

        })
    }
  } else {
    const allCurrency = await Currency.find();
    res.status(201).json(allCurrency)
  }

};
module.exports.getAll = async (req, res) => {
  //email password
  const candidate = await Currency.find({
    email: req.body.email
  });
  if (candidate) {
    res.status(201).json(candidate)
  }
};

module.exports.update = async (req, res) => {
  //email password
  console.log('req.body', req.body);
  const currency = new Currency({
    value: req.body.value,
    email: req.body.email
  });
  try {
    await currency.save();
    res.status(201).json(currency)
  } catch (e) {
    errorHandler(res, e)
  }

};