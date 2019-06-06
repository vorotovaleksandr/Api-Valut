const { gql } = require('apollo-server-express');

const typeDef = gql`
type UserCurrency {
  email: String
  value: String 
  }
type ExchangeRate {
   baseCurrency: String
   saleRateNB: String
   purchaseRateNB: String
   currency: String   
  }
type Currency {  
  date: String 
  bank: String
  baseCurrency: String
  baseCurrencyLit: String 
  exchangeRate: [ ExchangeRate ]
  }
type Query {
  currencys: [Currency] 
  date(date: String): Currency 
  history(item: String): [Currency]
  userCurrency(email: String): [UserCurrency]
  }
`;
module.exports = typeDef;