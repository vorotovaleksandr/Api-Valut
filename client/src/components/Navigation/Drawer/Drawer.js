import React, { Component, Fragment } from 'react';
import classes from './Drawer.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
  {to: '/', label: 'Currency', exact: true},
  {to: '/login', label: 'Authorization', exact: false},
  {to: '/mycurrency', label: 'My Currency', exact: false},
  {to: '/myprofile', label: 'Edit Profile', exact: false},
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose()
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const {isOpen, onClose} = this.props;
    const cls = [classes.Drawer];
    if (!isOpen) {
      cls.push(classes.close)
    }
    return (
      <Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {isOpen ? <Backdrop onClick={onClose}/> : null}
      </Fragment>
    )
  }
}

export default Drawer;