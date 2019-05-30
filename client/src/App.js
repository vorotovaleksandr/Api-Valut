import React, { Component } from 'react';
import Layout from './hoc/Layout/layout';
import { Route, Switch } from 'react-router-dom'
import Currency from './containers/Currency/Currency';
import Auth from './containers/Auth/Auth';
import Registrate from './containers/Registrate/Registrate'
import MyCurrency from './containers/MyCurrency/MyCurrency';
import withAuth from './hoc/withAuth/withAuth';
import MyProfile from './containers/MyProfile/MyProfile';


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={Auth}/>
          <Route path="/registrate" component={Registrate}/>
          <Route path="/mycurrency" component={withAuth(MyCurrency)}/>
          <Route path="/myprofile" component={withAuth(MyProfile)}/>
          <Route path="/" component={withAuth(Currency)}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
