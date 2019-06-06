const Currency = require( '../models/currency' );
const MyCurrency = require( '../models/myCurrency' );
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
      await Currency.deleteMany( {} );
      for (let i = 0; i < 31; i++) {
        let dataByDate = moment( dDateRevString ).subtract( i, 'days' ).format( FORMAT_TYPE );
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
      res.status( 201 ).json( true )
    } else {
      console.log( '-----', );
      res.status( 201 ).json( true )
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
  const candidate = await MyCurrency.find( {
    value: req.body.value,
    email: req.body.email
  } );
  if (candidate.length !== 0) {
    //user use again
    res.status( 409 ).json( {
      message: 'such an currency is already taken'
    } )
  } else {
    const currency = new MyCurrency( {
      value: req.body.value,
      email: req.body.email
    } );
    try {
      await currency.save();
      res.status( 201 ).json( {message: ` You like currency ${req.body.value} `} )
    } catch (e) {
      errorHandler( res, e )
    }
  }
};
module.exports.updateDelete = async ( req, res ) => {
  await MyCurrency.findOneAndDelete( {
    value: req.body.value,
    email: req.body.email
  } );
  const currency = await MyCurrency.find( {
    email: req.body.email
  } );
  if (currency) {
    res.status( 201 ).json( currency )
  }
};
module.exports.get = async ( req, res ) => {
  const currency = await MyCurrency.find( {
    email: req.body.email
  } );
  if (currency) {
    res.status( 201 ).json( currency )
  }
};
