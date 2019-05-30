import React, { Component } from 'react';
import classes from './MyProfile.css';
import { Button, Form } from 'react-bootstrap'
import cx from 'classnames';
import axios from 'axios';

const defaultState = {
  popUpShow: false,
  form: {
    name: {
      isValid: true,
      value: '',
    },
    email: {
      isValid: true,
      value: '',
    },
    password: {
      isValid: true,
      value: '',
    },
  },
};

class MyProfile extends Component {
  state = defaultState;

  componentDidMount() {
    const email = localStorage.getItem( 'email' );
    axios( {
      url: 'http://localhost:5000/auth/get',
      method: 'POST',
      data: {
        email
      }
    } ).then( req => {
      this.setState( {
        form: {
          name: {
            value: req.data.name
          },
          email: {
            value: req.data.email
          }
        }
      } )
    } ).catch( () => {
      console.log( 'error' );
      this.setState( {loading: false, redirect: true} );
    } )
  }

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
  editProfile = () => {
    axios( {
      url: 'http://localhost:5000/auth/update',
      method: 'POST',
      data: {
        name: this.state.form.name.value,
        email: this.state.form.email.value,
        password: this.state.form.email.value,
      }
    } ).then( req => {

    } ).catch( () => {
      console.log( 'error' );
      this.setState( {loading: false, redirect: true} );
    } )
  };
  popupClose = () => {
    this.setState( {popUpShow: false} );
  };

  render() {
    const popUp = this.state.popUpShow;
    return (
      <div className={classes.profile} onClick={this.popupClose}>
        <h3>Edit profile</h3>
        <Form>
          <div className={classes.profile__form}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Small text"
              onChange={event => this.onChangeInput( event, 'name' )}
            />
            <br/>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={event => this.onChangeInput( event, 'email' )}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={event => this.onChangeInput( event, 'password' )}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.editProfile()}
            >
              Edit
            </Button>
          </div>
        </Form>
        <div className={cx( classes.showPopUp, !popUp ? classes.showPopUpTrue : classes.showPopUpFalse )}>
          <p>task added</p>
          <i className="fa fa-angle-down" aria-hidden="true" onClick={this.popupClose}/></div>
      </div>
    )
  }
}

export default MyProfile;

