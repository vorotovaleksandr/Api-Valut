import React, { Component } from 'react';
import axios from "axios";
import classes from "./MyCurrency.css";
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Chart from '../../components/UI/Chart/Chart'
import { ListGroup } from "react-bootstrap";

const testtt1 = (...props) => {

};

const defaultState = {
  popUpShow: {
    valid: false,
    value: ''
  },
  myCurrency: [],
  data: [],
  date: [],
};

class MyCurrency extends Component {
  state = defaultState;
  buffer = this.state;


  render() {
    const row = this.buffer;
    const currencyPurchaseRate = [];
    const currencySalesRate = [];
    const email = localStorage.getItem( 'email' );
    return (

      <div className={classes.QuizList}>
        <div>
          <h1> My Currency List </h1>
          <Query
            query={gql`
      {userCurrency(email:"${email}"){value}}
    `}
          >
            {( {loading, error, data} ) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              console.log('-----data', data.userCurrency);
              data.userCurrency.forEach((item) => {
                console.log('-----data', item.value);
                row.myCurrency.push(
                  item.value
                )
              });

              console.log('-----row.myCurrency', row.myCurrency);
              return(
                <p></p>
              )
            }}
          </Query>
          {row.myCurrency.forEach((item) => {
            return(
              <Query
                query={gql`
      {history(item:"${item}"){exchangeRate{currency,baseCurrency,saleRateNB,purchaseRateNB}}}
    `}
              >
                {( {loading, error, data} ) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;
                  data.history.forEach( ( item ) => {
                    const {purchaseRateNB, saleRateNB} = item.exchangeRate[0];
                    currencyPurchaseRate.push(
                      purchaseRateNB
                    );
                    currencySalesRate.push(
                      saleRateNB
                    );
                  } );
                  const curPurRate = currencyPurchaseRate.reverse();
                  const curSaleRate = currencySalesRate.reverse();
                  const curDateRate = this.state.date.reverse();
                  this.buffer.data = [];
                  if (curPurRate.length === curSaleRate.length) {
                    for (let i = 0; i < curPurRate.length; i++) {
                      this.buffer.data.push( {
                        name: curDateRate[i],
                        purchase: +curPurRate[i],
                        sale: +curSaleRate[i]
                      } )
                    }
                  }
                  return (
                    <div>
                      <Chart
                        data={this.buffer.data}
                      />
                    </div>
                  );
                }}
              </Query>)
          }) }

          {/*{row.map( ( item, index ) => {*/}
          {/*  return (*/}
          {/*    <ListGroup key={`12${index}`} as="ul" className="homeDnd__secondUl">*/}
          {/*      <ListGroup.Item*/}
          {/*        as="li"*/}
          {/*        key={`11${index}`}*/}
          {/*      >*/}
          {/*        {item.musicValue}*/}
          {/*        <i*/}
          {/*          className="fa fa-heart"*/}
          {/*          aria-hidden="true"*/}
          {/*        />*/}
          {/*      </ListGroup.Item>*/}
          {/*    </ListGroup>*/}
          {/*  );*/}
          {/*} )}*/}
        </div>
      </div>
    )
  }
}


export default MyCurrency;
