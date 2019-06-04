const Currency = require( '../models/currency' );
const errorHandler = require( '../routes/utils/errorHandler' );
const request = require( 'request-promise' );
const moment = require( 'moment' );
const FORMAT_TYPE = 'DD.MM.YYYY';
let dDateRevString = moment().format( FORMAT_TYPE );
let dMaxDateRevString = moment().subtract( 30, 'days' ).format( FORMAT_TYPE );

module.exports.add = async ( req, res ) => {
  try {
    const newDateUpdate = await Currency.findOne( {
      date: dDateRevString
    } );
    const oldDateUpdate = await Currency.findOne( {
      date: dMaxDateRevString
    } );
    const dateUpdate = newDateUpdate && oldDateUpdate;
    if (!dateUpdate) {
      for (let i = 25; i < 31; i++) {
        let dataByDate = moment( dMaxDateRevString ).add( i, 'days' ).format( FORMAT_TYPE );
        const resp = await request( {
          json: true,
          method: 'GET',
          uri: `https://api.privatbank.ua/p24api/exchange_rates?json&date=${dataByDate}`
        } );
        const currency = new Currency(
          resp
        );
        currency.save();
      }
      const allCurrency =  Currency.find();
      res.status( 201 ).json( allCurrency )
    } else {
      const allCurrency = await Currency.find();
      res.status( 201 ).json( allCurrency )
    }
  } catch (err) {
    res.status( 500 ).send( err );
  }
};
module.exports.getAll = async ( req, res ) => {
  const candidate = await Currency.find();
  if (candidate) {
    res.status( 201 ).json( candidate )
  }
};

module.exports.update = async ( req, res ) => {
  const currency = new Currency( {
    value: req.body.value,
    email: req.body.email
  } );
  try {
    await currency.save();
    res.status( 201 ).json( currency )
  } catch (e) {
    errorHandler( res, e )
  }
};