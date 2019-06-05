const Currency = require( '../models/currency' );

const resolvers = {
  Query: {
    currencys(parent, args, ctx, info){
     return Currency.find()},
    date(parent, args, ctx, info){
      if (!args.date) {
        throw new Error('id is required')
      }
      return Currency.findOne({
        date:args.date
      })},
    history(parent, args, ctx, info){
      if (!args.item) {
        throw new Error('id is required')
      }
      return Currency.find(
      {"exchangeRate.currency": `${args.item}` },
      {exchangeRate: {$elemMatch: {currency: args.item}}})

      }}

  };
module.exports = resolvers;