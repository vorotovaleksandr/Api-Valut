const Currency = require('../models/currency');
const errorHandler = require('../routes/utils/errorHandler');
const request = require('request-promise');
const defaultDate = new Date().toISOString().slice( 0, 10 );
let defaultDateRevers= [defaultDate[8],defaultDate[9],'.',defaultDate[5],defaultDate[6],'.',defaultDate[0],defaultDate[1],defaultDate[2],defaultDate[3]];
let dDateRevString = defaultDateRevers.join('');
let defMaxDateTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
let defMaxDateTimeRev= [defMaxDateTime[8],defMaxDateTime[9],'.',defMaxDateTime[5],defMaxDateTime[6],'.',defMaxDateTime[0],defMaxDateTime[1],defMaxDateTime[2],defMaxDateTime[3]];
let dMaxDateRevString = defMaxDateTimeRev.join('');
let i=0;

module.exports.add = async (req, res) => {
  const newDateUpdate = await Currency.findOne({
    date: dDateRevString
  });
  const oldDateUpdate = await Currency.findOne({
    date: dMaxDateRevString
  });
  const dateUpdate = newDateUpdate && oldDateUpdate;
  console.log('-----dateUpdate', dateUpdate);
  if(!dateUpdate){
     Currency.drop();
    for(i=0; i < 31; i++){
      let maxDateTime = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      let grip= [maxDateTime[8],maxDateTime[9],'.',maxDateTime[5],maxDateTime[6],'.',maxDateTime[0],maxDateTime[1],maxDateTime[2],maxDateTime[3]];
      let dateLink = grip.join('');
      request({
        json: true,
        method: 'GET',
        uri: `https://api.privatbank.ua/p24api/exchange_rates?json&date=${dateLink}`
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
           console.log('-----err', err);
        })
    }
  } else {
    const allCurrency = await Currency.find();
    res.status(201).json(allCurrency)
  }

};
module.exports.getAll = async (req, res) => {
  const candidate = await Currency.find();
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