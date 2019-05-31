import React, { Component } from 'react';
import classes from './Currency.css';
import axios from 'axios';
import cx from 'classnames';

const defaultState = {
  form: {
    date: {
      value: '',
      isValid: false
    },
  },
  popUpShow: {
    valid: false,
    value: ''
  },
  currency: [],
  currencyTitle: [],
  saleRateNB: [],
  purchaseRateNB: [],

};

class Currency extends Component {
  state = defaultState;
  buffer = this.state;

  componentDidMount() {
    let dateStatea = new Date().toISOString().slice( 0, 10 );
    axios( {
      url: 'http://localhost:5000/currency/getall',
      method: 'POST',
    } ).then( req => {
      req.data.forEach(
        ( item ) => {
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
              value: dateStatea,
              isValid: true
            },
          },
          currency: this.buffer.currency
        }
      );
      let dateState = this.state.form.date.value;
      let dateStateRev = [dateState[8], dateState[9], '.', dateState[5], dateState[6], '.', dateState[0], dateState[1], dateState[2], dateState[3]];
      let dateStateRevString = dateStateRev.join( '' );
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
        } )
      }
    } ).catch( (req) => {      
      this.setState( {popUpShow: {
          valid: true,
          value: req.response.data.message
        }} );
    } )
  }


  currencyLike = ( item ) => {
    console.log( '-----item', item.musicValue );
    const email = localStorage.getItem( 'email' );
    axios( {
      url: 'http://localhost:5000/currency/update',
      method: 'POST',
      data: {
        email,
        value: item.musicValue
      }
    } ).then( req => {


    } ).catch( () => {
      console.log( 'error' );
    } )
  };
  onChangeInput = ( event, field ) => {
    this.setState( {
      form: {
        ...this.state.form,
        [field]: {
          value: event.target.value,
          isValid: true,
        },
      },
    } );

  };

  render() {
    const state = this.state;
    const popUp = state.popUpShow;
    let defaultDate = new Date().toISOString().slice( 0, 10 );
    let days = 30;
    const maxDateTime = new Date( Date.now() - days * 24 * 60 * 60 * 1000 ).toISOString().slice( 0, 10 );
    let dateState = state.form.date.value;
    let dateStateRev = [dateState[8], dateState[9], '.', dateState[5], dateState[6], '.', dateState[0], dateState[1], dateState[2], dateState[3]];
    let dateStateRevString = dateStateRev.join( '' );
    const [testtt] = state.currency.filter( el => el.date === dateStateRevString );


    return (
      <div className={classes.QuizList}>
        <div>
          <div className="form-group row">
            <label
              htmlFor="example-date-input"
              className="col-2 col-form-label"
            >
              chose date in currency
            </label>
            <div className="col-10">
              <input
                className="form-control"
                type="date"
                defaultValue={this.state.form.date.value}
                min={maxDateTime}
                max={defaultDate}
                id="example-date-input"
                onChange={event => this.onChangeInput( event, 'date' )}
              />
            </div>
          </div>
          <table className={classes.genTbl}>
            <tbody>            
            <tr>
              <th>Currency</th>
              {state.currencyTitle.map((itm,ind) =>{
                return(
                  <td
                    key={ind}
                  >
                    {itm}
                  </
                  td
                  >
                )
              }) }
            </tr>
            <tr>
              <th>Sale rate</th>
              {state.saleRateNB.map((itm,ind) =>{
                return(
                  <td
                    key={ind}
                  >
                    {itm}
                  </
                    td
                  >
                )
              }) }
            </tr>
            <tr>
              <th>Purchase rate</th>
              {state.purchaseRateNB.map((itm,ind) =>{
                return(
                  <td
                    key={ind}
                  >
                    {itm}
                  </
                    td
                  >
                )
              }) }
            </tr>
            </tbody>
          </table>
         
        </div>
        <div className={cx( classes.showPopUp, !popUp.valid ? classes.showPopUpTrue : classes.showPopUpFalse )}>
          <p>{popUp.value}</p>
          <i className="fa fa-angle-down" aria-hidden="true" onClick={this.popupClose}/></div>
      </div>
    )
  }
}

export default Currency;
