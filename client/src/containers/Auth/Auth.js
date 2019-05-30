import React, { Component } from 'react';
import classes from './Auth.css';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import cx from 'classnames';
import { NavLink,Redirect } from 'react-router-dom';

const defaultState = {
  redirect: false,
  popUpShow: {
    valid: false,
    value: ''
  },
  form: {
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

class Auth extends Component {
  state = defaultState;

  loginHandler = async () => {
    const authData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };
    axios( {
      url: 'http://localhost:5000/auth/login',
      method: 'POST',
      data: authData
    } ).then( response => {
      localStorage.setItem( 'token', response.data.token );
      document.cookie = "token" + "=" + response.data.token;
      this.setState({redirect: true})

    } ).catch( req => {
      this.setState( {
        popUpShow: {
          valid: true,
          value: req.response.data.message
        }
      } );
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
  popupClose = () => {
    this.setState( {popUpShow: false} );
  };

  render() {
    const popUp = this.state.popUpShow;
    if (this.state.redirect) {
      return <Redirect to="/"/>;
    }
    return (
      <div className={classes.auth} onClick={this.popupClose}>
        <h3>Login</h3>
        <div className={classes.auth__form}>
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
            className={classes.Btn__Form}
            variant="primary"
            type="submit"
            onClick={() => this.loginHandler()}
          >
            Login
          </Button>
          <Button
            className={classes.Btn__Form}
            variant="primary"
            type="submit"
          >
            <NavLink
              to="registrate"
            >
              Registration
            </NavLink>
          </Button>
        </div>
        <div className={cx( classes.showPopUp, !popUp.valid ? classes.showPopUpTrue : classes.showPopUpFalse )}>
          <p>{popUp.value}</p>
          <i className="fa fa-angle-down" aria-hidden="true" onClick={this.popupClose}/></div>
      </div>
    )
  }
}

export default Auth;
