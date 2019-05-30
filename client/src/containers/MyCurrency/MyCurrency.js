import React, { Component } from 'react';
import axios from "axios";
import classes from "./MyCurrency.css";
import { ListGroup } from "react-bootstrap";

const defaultState = {
  popUpShow: {
    valid: false,
    value: ''
  },
  myMusic: []
};

class MyCurrency extends Component {
  state = defaultState;
  buffer = this.state.myMusic;

  componentDidMount() {
    const email = localStorage.getItem( 'email' );
    axios( {
      url: 'http://localhost:5000/currency/getall',
      method: 'POST',
      data: {
        email
      }
    } ).then( req => {
      console.log( '-----req.data', req.data );
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

  render() {
    const row = this.buffer;
    return (
      <div className={classes.QuizList}>
        <div>
          <h1> My Currency List </h1>
          {row.map( ( item, index ) => {
            return (
              <ListGroup key={`12${index}`} as="ul" className="homeDnd__secondUl">
                <ListGroup.Item
                  as="li"
                  key={`11${index}`}
                >
                  {item.musicValue}
                  <i
                    className="fa fa-heart"
                    aria-hidden="true"
                  />
                </ListGroup.Item>
              </ListGroup>
            );
          } )}
        </div>
      </div>
    )
  }
}

export default MyCurrency;
