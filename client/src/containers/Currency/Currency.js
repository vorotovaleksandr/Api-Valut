import React, { Component } from 'react';
import classes from './Currency.css';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap'
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
  currency: [

  ]
};

class Currency extends Component {
  state = defaultState;
  buffer = this.state.myMusic;

  componentDidMount() {
    axios( {
      url: 'http://localhost:5000/currency/getall',
      method: 'POST',
      data: {
        email: 'Start'
      }
    } ).then( req => {
      req.data.forEach(
        ( item ) => {
          this.buffer.push(
            {
              musicValue: item.value,
              email: item.email,
            },
          );
        } );
      this.setState( {myMusic: this.buffer}
      );
    } ).catch( () => {
      console.log( 'error' );
      this.setState( {loading: false, redirect: true} );
    } )
  }

  musicLike = ( item ) => {
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
    console.log('-----this.state', this.state);
  };

  render() {
    const row = this.buffer;
    const popUp = this.state.popUpShow;
    let defaultDate = new Date().toISOString().slice( 0, 10 );
    let days=30;
    const maxDateTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);


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
                defaultValue={defaultDate}
                min={maxDateTime}
                max={defaultDate}
                id="example-date-input"
                onChange={event => this.onChangeInput( event, 'date' )}
              />
            </div>
          </div>
          <table className={classes.genTbl} id="exchange_rates_1">
            <thead>
            <tr>
              <th className="left first">Currency</th>
              <th>
                <span className="ceFlags USD">&nbsp;</span>
                &nbsp; USD
              </th>
              <th>
                <span className="ceFlags European_Union">&nbsp;</span>
                &nbsp; EUR
              </th>
              <th>
                <span className="ceFlags United_Kingdom">&nbsp;</span>
                &nbsp; GBP
              </th>
              <th>
                <span className="ceFlags Japan">&nbsp;</span>
                &nbsp; JPY
              </th>
              <th>
                <span className="ceFlags Switzerland">&nbsp;</span>
                &nbsp; CHF
              </th>
              <th>
                <span className="ceFlags Canada">&nbsp;</span>
                &nbsp; CAD
              </th>
              <th>
                <span className="ceFlags Australia">&nbsp;</span>
                &nbsp; AUD
              </th>
              <th>
                <span className="ceFlags Russian_Federation">&nbsp;</span>
                &nbsp; RUB
              </th>
            </tr>
            </thead>
            <tbody>
            <tr id="pair_12">
              <td className="left first">
                <span className="ceFlags USD">&nbsp;</span>
                &nbsp; USD
              </td>
              <td className="" id="last_12_12">
                1
              </td>

              <td className="pid-2124-last" id="last_12_17">
                0,8992
              </td>

              <td className="pid-2126-last" id="last_12_3">
                0,7935
              </td>

              <td className="pid-3-last" id="last_12_2">
                109,87
              </td>

              <td className="pid-4-last" id="last_12_4">
                1,0085
              </td>

              <td className="pid-7-last" id="last_12_15">
                1,3493
              </td>

              <td className="pid-2091-last" id="last_12_1">
                1,4475
              </td>

              <td className="pid-2186-last" id="last_12_79">
                65,0209
              </td>

            </tr>
            <tr id="pair_17">
              <td className="left first">
                <span className="ceFlags European_Union">&nbsp;</span>
                &nbsp; EUR
              </td>
              <td className="pid-1-last" id="last_17_12">
                1,1121
              </td>

              <td className="" id="last_17_17">
                1
              </td>

              <td className="pid-6-last" id="last_17_3">
                0,8824
              </td>

              <td className="pid-9-last" id="last_17_2">
                122,18
              </td>

              <td className="pid-10-last" id="last_17_4">
                1,1216
              </td>

              <td className="pid-16-last" id="last_17_15">
                1,5002
              </td>

              <td className="pid-15-last" id="last_17_1">
                1,6099
              </td>

              <td className="pid-1691-last" id="last_17_79">
                72,2951
              </td>

            </tr>
            <tr id="pair_3">
              <td className="left first">
                <span className="ceFlags United_Kingdom">&nbsp;</span>
                &nbsp; GBP
              </td>
              <td className="pid-2-last" id="last_3_12">
                1,2603
              </td>

              <td className="pid-1751-last" id="last_3_17">
                1,1333
              </td>

              <td className="" id="last_3_3">
                1
              </td>

              <td className="pid-11-last" id="last_3_2">
                138,45
              </td>

              <td className="pid-12-last" id="last_3_4">
                1,2711
              </td>

              <td className="pid-54-last" id="last_3_15">
                1,7002
              </td>

              <td className="pid-53-last" id="last_3_1">
                1,8243
              </td>

              <td className="pid-1790-last" id="last_3_79">
                81,942
              </td>

            </tr>
            <tr id="pair_2">
              <td className="left first">
                <span className="ceFlags Japan">&nbsp;</span>
                &nbsp; JPY
              </td>
              <td className="pid-1910-last" id="last_2_12">
                0,00910
              </td>

              <td className="pid-1895-last" id="last_2_17">
                0,00819
              </td>

              <td className="pid-1896-last" id="last_2_3">
                0,00722
              </td>

              <td className="" id="last_2_2">
                1
              </td>

              <td className="pid-1892-last" id="last_2_4">
                0,0092
              </td>

              <td className="pid-1891-last" id="last_2_15">
                0,01228
              </td>

              <td className="pid-1889-last" id="last_2_1">
                0,01317
              </td>

              <td className="pid-9785-last" id="last_2_79">
                0,5918
              </td>

            </tr>
            <tr id="pair_4">
              <td className="left first">
                <span className="ceFlags Switzerland">&nbsp;</span>
                &nbsp; CHF
              </td>
              <td className="pid-1560-last" id="last_4_12">
                0,9917
              </td>

              <td className="pid-1547-last" id="last_4_17">
                0,8918
              </td>

              <td className="pid-1548-last" id="last_4_3">
                0,7869
              </td>

              <td className="pid-13-last" id="last_4_2">
                108,95
              </td>

              <td className="" id="last_4_4">
                1
              </td>

              <td className="pid-1545-last" id="last_4_15">
                1,3381
              </td>

              <td className="pid-1542-last" id="last_4_1">
                1,4354
              </td>

              <td className="pid-9564-last" id="last_4_79">
                64,48
              </td>

            </tr>
            <tr id="pair_15">
              <td className="left first">
                <span className="ceFlags Canada">&nbsp;</span>
                &nbsp; CAD
              </td>
              <td className="pid-1538-last" id="last_15_12">
                0,7411
              </td>

              <td className="pid-1525-last" id="last_15_17">
                0,6665
              </td>

              <td className="pid-1526-last" id="last_15_3">
                0,5882
              </td>

              <td className="pid-51-last" id="last_15_2">
                81,45
              </td>

              <td className="pid-14-last" id="last_15_4">
                0,7476
              </td>

              <td className="" id="last_15_15">
                1
              </td>

              <td className="pid-1522-last" id="last_15_1">
                1,0728
              </td>

              <td className="pid-9481-last" id="last_15_79">
                48,19
              </td>

            </tr>
            <tr id="pair_1">
              <td className="left first">
                <span className="ceFlags Australia">&nbsp;</span>
                &nbsp; AUD
              </td>
              <td className="pid-5-last" id="last_1_12">
                0,6909
              </td>

              <td className="pid-1487-last" id="last_1_17">
                0,6213
              </td>

              <td className="pid-1489-last" id="last_1_3">
                0,5482
              </td>

              <td className="pid-49-last" id="last_1_2">
                75,90
              </td>

              <td className="pid-48-last" id="last_1_4">
                0,6967
              </td>

              <td className="pid-47-last" id="last_1_15">
                0,9319
              </td>

              <td className="" id="last_1_1">
                1
              </td>

              <td className="pid-9388-last" id="last_1_79">
                44,92
              </td>

            </tr>
            <tr id="pair_79">
              <td className="left first">
                <span className="ceFlags Russian_Federation">&nbsp;</span>
                &nbsp; RUB
              </td>
              <td className="pid-10064-last" id="last_79_12">
                0,01538
              </td>

              <td className="pid-10032-last" id="last_79_17">
                0,01383
              </td>

              <td className="pid-10033-last" id="last_79_3">
                0,01220
              </td>

              <td className="pid-10042-last" id="last_79_2">
                1,6898
              </td>

              <td className="pid-13918-last" id="last_79_4">
                0,01551
              </td>

              <td className="pid-13919-last" id="last_79_15">
                0,02075
              </td>

              <td className="pid-13920-last" id="last_79_1">
                0,02226
              </td>

              <td className="" id="last_79_79">
                1
              </td>

            </tr>
            </tbody>
          </table>
          {/*{row.map( ( item, index ) => {*/}
          {/*  return (*/}
          {/*    <ListGroup key={index} as="ul" className="homeDnd__secondUl">*/}
          {/*      <ListGroup.Item*/}
          {/*        as="li"*/}
          {/*        key={index}*/}
          {/*      >*/}
          {/*        {item.musicValue}*/}
          {/*        <i*/}
          {/*          className="fa fa-heart"*/}
          {/*          aria-hidden="true"*/}
          {/*          onClick={() => this.musicLike( item )}*/}
          {/*        />*/}
          {/*      </ListGroup.Item>*/}
          {/*      <ListGroup.Item*/}
          {/*        as="li"*/}
          {/*        key={index}*/}
          {/*      >*/}
          {/*        {item.musicValue}*/}
          {/*        <i*/}
          {/*          className="fa fa-heart"*/}
          {/*          aria-hidden="true"*/}
          {/*          onClick={() => this.musicLike( item )}*/}
          {/*        />*/}
          {/*      </ListGroup.Item>*/}
          {/*    </ListGroup>*/}
          {/*  );*/}
          {/*} )}*/}
        </div>
        <div className={cx( classes.showPopUp, !popUp.valid ? classes.showPopUpTrue : classes.showPopUpFalse )}>
          <p>{popUp.value}</p>
          <i className="fa fa-angle-down" aria-hidden="true" onClick={this.popupClose}/></div>
      </div>
    )
  }
}

export default Currency;
