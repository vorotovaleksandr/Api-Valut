import React, { Component } from 'react';
import axios from 'axios';
import cx from 'classnames';
import moment from 'moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import classes from './Currency.css';
import Chart from '../../components/UI/Chart/Chart'
import CircularUnderLoad from '../../components/UI/Loader/Loader'

const FORMAT_TYPE = 'DD.MM.YYYY';
const defaultState = {
  popUpCurrencyShow: {
    valid: false,
    value: ''
  },
  form: {
    date: {
      value: '',
      index: '',
      isValid: false,
    },
  },
  popUpShow: {
    valid: false,
    value: '',
  },
  currency: [],
  date: [],
  currencyTitle: [],
  saleRateNB: [],
  purchaseRateNB: [],
  exchangeRate: [],
  isLoading: true,
  dDateRevString: moment().format( FORMAT_TYPE ),
  dMaxDateRevString: moment().subtract( 30, 'days' ).format( FORMAT_TYPE ),
  data: [],
  popUpCurrencyShowHistory: false
};

class Currency extends Component {
  state = defaultState;
  buffer = this.state;

  componentDidMount() {

    axios( {
      url: 'http://localhost:5000/currency/getAll',
      method: 'POST',
    } ).then( req => {
      req.data.forEach(
        ( item ) => {
          this.buffer.date.push(
            item.date
          );
          this.buffer.currency.push(
            {
              date: item.date,
              bank: item.bank,
              baseCurrency: item.baseCurrency,
              baseCurrencyLit: item.baseCurrencyLit,
              exchangeRate: item.exchangeRate
            } );
        } );
      this.setState( {
          form: {
            date: {
              value: new Date(),
              isValid: true
            },
          },
          currency: this.buffer.currency,
          date: this.buffer.date,
        }
      );
      let dateStateRevString = this.state.dDateRevString;
      const [testtt] = this.buffer.currency.filter( el => el.date === dateStateRevString );
      if (this.buffer.currency) {
        const currencys = testtt.exchangeRate;
        currencys.forEach( ( item ) => {
          this.buffer.currencyTitle.push(
            item.currency
          );
          this.buffer.saleRateNB.push(
            item.saleRateNB
          );
          this.buffer.purchaseRateNB.push(
            item.purchaseRateNB
          );
        } );
        this.setState( {
          currencyTitle: this.buffer.currencyTitle,
          saleRateNB: this.buffer.saleRateNB,
          purchaseRateNB: this.buffer.purchaseRateNB,
        } );
        this.setState( {
          isLoading: false,
        } );
      }
    } ).catch( ( req ) => {
      this.setState( {
        popUpShow: {
          valid: true,
          value: req.response
        }
      } );
    } )
  }

  likeCurrency = () => {
    this.state.currency.forEach( ( item ) => {
      const thifs = item.exchangeRate.filter( el => el.currency === this.state.popUpCurrencyShow.value );
      this.buffer.exchangeRate.push(
        thifs
      );
    } );
    const email = localStorage.getItem( 'email' );
    axios( {
      url: 'http://localhost:5000/currency/update',
      method: 'POST',
      data: {
        email,
        value: this.buffer.exchangeRate
      }
    } ).then( req => {


    } ).catch( () => {
      console.log( 'error' );
    } )
  };
  onChangeInput = ( date ) => {
    this.setState( {
      form: {
        ...this.state.form,
        date: {
          value: date,
          isValid: true,
        },
      },
    } );
    let dater = moment( date ).format( FORMAT_TYPE );
    const [testt] = this.buffer.currency.filter( el => el.date === dater );
    this.buffer.currencyTitle = [];
    this.buffer.saleRateNB = [];
    this.buffer.purchaseRateNB = [];
    if (testt) {
      const currencys = testt.exchangeRate;
      currencys.forEach( ( item ) => {
        this.buffer.currencyTitle.push(
          item.currency
        );
        this.buffer.saleRateNB.push(
          item.saleRateNB
        );
        this.buffer.purchaseRateNB.push(
          item.purchaseRateNB
        );
      } );
      this.setState( {
        currencyTitle: this.buffer.currencyTitle,
        saleRateNB: this.buffer.saleRateNB,
        purchaseRateNB: this.buffer.purchaseRateNB,
      } )
    } else {
      this.setState( {
        currencyTitle: this.buffer.currencyTitle,
        saleRateNB: this.buffer.currencyTitle,
        purchaseRateNB: this.buffer.currencyTitle,
      } )
    }

  };
  popUpCurrencyShows = ( itm, ind ) => {
    this.setState( {
      popUpCurrencyShow: {
        valid: true,
        index: ind,
        value: itm,
      }
    } )
  };
  popUpDontShows = () => {
    this.setState( {
      popUpShow: {
        valid: false,
        value: ''
      }
    } )
  };
  popUpCurrencyDontShows = () => {
    this.setState( {
      popUpCurrencyShow: {
        valid: false,
        value: ''
      }
    } )
  };
  showHistory = () => {
    this.setState( {
      popUpCurrencyShowHistory: true
    } )
  };

  render() {
    const currencyPurchaseRate = [];
    const currencySalesRate = [];
    const state = this.state;
    const popUp = state.popUpShow;
    const popUpCur = state.popUpCurrencyShow;

    return (
      <div
        onClick={this.popUpDontShows}
        className={classes.QuizList}
      >
        {this.state.popUpCurrencyShowHistory && <Query
          query={gql`
      {history(item:"${state.popUpCurrencyShow.value}"){exchangeRate{currency,baseCurrency,saleRateNB,purchaseRateNB}}}
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
        </Query>}
        <div>
          <div>
          </div>
          <div
            className={cx( classes.showPopUp, popUpCur.valid ? classes.showPopUpFalse : null )}
          >
            <p className={classes.cur__text} onClick={this.showHistory}>Show history</p>
            <p
              className={classes.cur__textValut}
            >{popUpCur.value}</p>
            <p className={classes.cur__text} onClick={this.likeCurrency}>Like currency</p>
            <i
              className="fa fa-angle-up "
              onClick={this.popUpCurrencyDontShows}
            />
          </div>
          {this.state.isLoading && <CircularUnderLoad/>}
          <DatePicker
            minDate={subDays( new Date(), 30 )}
            maxDate={new Date()}
            selected={state.form.date.value}
            onChange={this.onChangeInput}
            dateFormat={'dd.MM.YYYY'}
            showDateInput
          />
          {!this.state.isLoading && <table className={classes.genTbl}>
            <tbody>
            <tr>
              <th>Currency</th>
              {state.currencyTitle.map( ( itm, ind ) => {
                return (
                  <td
                    key={ind}
                    onClick={() => this.popUpCurrencyShows( itm, ind )}
                    className={classes.td__title}
                  >
                    {itm}
                  </
                    td
                  >
                )
              } )}
            </tr>
            <tr>
              <th>Sale rate</th>
              {state.saleRateNB.map( ( itm, index ) => {
                return (
                  <td
                    key={index}
                  >
                    {itm}
                  </
                    td
                  >
                )
              } )}
            </tr>
            <tr>
              <th>Purchase rate</th>
              {state.purchaseRateNB.map( ( itm, ind1 ) => {
                return (
                  <td
                    key={ind1}
                  >
                    {itm}
                  </
                    td
                  >
                )
              } )}
            </tr>
            </tbody>
          </table>}
        </div>
        <div className={cx( classes.showPopUp, !popUp.valid ? classes.showPopUpTrue : classes.showPopUpFalse )}>
          <p>{popUp.value}</p>
          <i className="fa fa-angle-down" aria-hidden="true" onClick={this.popupClose}/></div>
      </div>
    )
  }
}

export default Currency;
