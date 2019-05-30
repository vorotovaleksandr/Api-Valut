import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import getCookie from '../../utils/getCookie/getCookie'

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const cookie = getCookie('token');

      console.log('componentDidMount', cookie);
      axios({
        url: 'http://localhost:5000/checkToken',
        method: 'POST',
        data: {
          token: cookie
        }
      }).then(req => {
        this.setState({loading: false});
        console.log('componentDidMount', req.data);
        localStorage.setItem('email', req.data)

      }).catch(() => {
        console.log('error');
        this.setState({loading: false, redirect: true});
      })
    }

    render() {
      const {loading, redirect} = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login"/>;
      }
      return (
        <Fragment>
          <ComponentToProtect {...this.props} />
        </Fragment>
      );
    }
  }
}