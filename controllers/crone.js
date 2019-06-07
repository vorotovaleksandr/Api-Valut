const moment = require( 'moment' );
const FORMAT_TYPE = 'DD.MM.YYYY';

module.exports = async ( req, res ) => {
  await Currency.remove( {} );
  for (let i = 0; i < 31; i++) {
    let dataByDate = moment().subtract( i, 'days' ).format( FORMAT_TYPE );
    console.log( '-----dataByDate', dataByDate );
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

};