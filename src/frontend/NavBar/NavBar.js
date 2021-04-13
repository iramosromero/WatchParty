/* eslint-disable quotes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from "../Button";
import { MenuItems } from './MenuItems';

import './NavBar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.state.clicked) {
      this.setState(() => ({
        clicked: true,
      }));
    } else {
      this.setState(() => ({
        clicked: false,
      }));
    }
  }

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          WATCH PARTY
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          {this.state.clicked ? <FaTimes className="nav-ham" /> : <FaBars className="nav-ham" />}
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <Button>sign in</Button>
      </nav>
    );
  }
}

export default Navbar;
