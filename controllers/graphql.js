const Currency = require( '../models/currency' );
const MyCurrency = require( '../models/myCurrency' );

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
      },
    userCurrency(parent, args, ctx, info){
      if (!args.email) {
        throw new Error('id is required')
      }
      return MyCurrency.find({
        email:args.email
      })
    }

  }

  };
module.exports = resolvers;