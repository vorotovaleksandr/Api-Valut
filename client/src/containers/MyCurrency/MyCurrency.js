import React, { Component } from 'react';
import axios from "axios";
import classes from "./MyCurrency.css";
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Chart from '../../components/UI/Chart/Chart'
import { ListGroup } from "react-bootstrap";

const FORMAT_TYPE = 'DD.MM.YYYY';
const defaultState = {
  email: '',
  popUpShow: {
    valid: false,
    value: ''
  },
  myCurrency: [],
  data: [],
  date: [],
  loading: false,
  myCurrencyClick: {
    value: '',
    index: '',
    valid: false
  },
};

class MyCurrency extends Component {
  state = defaultState;
  buffer = this.state;

  componentDidMount() {
    const email = localStorage.getItem( 'email' );
    if(this.state.myCurrency.length === 0) {
      axios( {
        url: 'http://localhost:5000/currency/get',
        method: 'POST',
        data: {email}
      } ).then( req => {
        req.data.forEach( ( item ) => {
          this.buffer.myCurrency.push(
            {value: item.value}
          )
        } );
        for (let i = 0; i < 31; i++) {
          let dataByDate = moment( moment().format( FORMAT_TYPE ) ).subtract( i, 'days' ).format( FORMAT_TYPE );
          this.buffer.date.push(
            dataByDate
          )
        }
        this.setState( {
          email,
          myCurrency: this.buffer.myCurrency,
          loading: true,
          date: this.buffer.date
        } )
      } );
    } else {
      this.setState( {
        loading: true
      } )
    }
  };

  chartShows = ( itm, ind ) => {
    this.setState( {
      myCurrencyClick: {
        valid: true,
        index: ind,
        value: itm,
      }
    } )

  };

  deleteItem = ( itm ) => {
    axios( {
      url: 'http://localhost:5000/currency/updateDelete',
      method: 'POST',
      data: {
        email: this.state.email,
        value: itm.value,
      }
    } ).then( req => {
      this.buffer.myCurrency = [];
      req.data.forEach( ( item ) => {
        this.buffer.myCurrency.push(
          {value: item.value}
        )
      } );
      this.setState( {
        myCurrency: this.buffer.myCurrency,
        loading: true,

      } )
    } );
  };
  chartDontShows = () => {
    this.setState( {
      myCurrencyClick: {
        valid: false,
        index: '',
        value: '',
      }
    } )
  };

  render() {
    const row = this.buffer;
    const state = this.state;
    const currencyPurchaseRate = [];
    const currencySalesRate = [];
    return (

      <div
        className={classes.QuizList}
      >
        <div>
          <h1> My Currency List </h1>
          {state.myCurrencyClick.valid && <Query
            query={gql`
      {history(item:"${this.state.myCurrencyClick.value.value}"){exchangeRate{currency,baseCurrency,saleRateNB,purchaseRateNB}}}
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
              const minPurItem = Math.min.apply( null, curPurRate );
              const maxPurItem = Math.max.apply( null, curPurRate );
              const curSaleRate = currencySalesRate.reverse();
              const minSaleItem = Math.min.apply( null, curSaleRate );
              const maxSaleItem = Math.max.apply( null, curSaleRate );
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
                <div className={classes.positionRel}>
                  <i
                    className={`fa fa-times-circle ${classes.margin__left}`}
                    aria-hidden="true"
                    onClick={this.chartDontShows}
                  />
                  <Chart
                    data={this.buffer.data}
                  />
                  <ListGroup>
                    <ListGroup.Item variant="success">Max selling price : {maxSaleItem}</ListGroup.Item>
                    <ListGroup.Item variant="danger">Min selling price : {minSaleItem}</ListGroup.Item>
                    <ListGroup.Item variant="success">Max purchase price: {maxPurItem}</ListGroup.Item>
                    <ListGroup.Item variant="danger">Min purchase price: {minPurItem}</ListGroup.Item>
                  </ListGroup>
                </div>
              );
            }}
          </Query>}
          {state.loading && row.myCurrency.map( ( item, index ) => {
            return (
              <ListGroup key={`12${index}`} as="ul" className={classes.homeDnd__secondUl}>
                <ListGroup.Item
                  as="li"
                  key={`11${index}`}
                  className={classes.homeDnd__secondIl}
                >
                  <span
                    onClick={() => this.chartShows( item, index )}
                  >
                  <span
                    className={classes.homeDnd__secondP}
                  >
                    You like currency
                  </span>
                  <span>
                    {item.value}
                  </span>
                  <i
                    className={`fa fa-heart ${classes.custom_icon_heart}`}
                    aria-hidden="true"
                  />
                   </span>
                  <i
                    className={`fa fa-times-circle ${classes.margin__left}`}
                    aria-hidden="true"
                    onClick={() => this.deleteItem( item, index )}
                  />
                </ListGroup.Item>
              </ListGroup>
            );
          } )
          }
        </div>
      </div>
    )
  }
}

export default MyCurrency;
