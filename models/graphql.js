const { gql } = require('apollo-server-express');

const typeDef = gql`
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
  }
`;
module.exports = typeDef;