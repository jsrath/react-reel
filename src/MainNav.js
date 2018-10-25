import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, NavbarNav, NavbarToggler, Collapse, Fa } from 'mdbreact';
import logo from './logo.svg';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
  }

  navClick = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    if (window.location.pathname === '/login') return null;
    return (
      <Navbar className="sticky-top" color="default-color" dark expand="md">
        <div className="container">
          <NavLink className="mr-4" to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.navClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem className="pr-5 h-100">
                <NavLink to="/movies">
                  <Fa icon="video-camera" /> Movies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/series">
                  <Fa icon="tv" /> Series
                </NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right className="mx-4">
              <NavLink to="/">
                <NavItem className="text-white" onClick={this.props.logOut}>
                  <Fa icon="lock" /> Logout
                </NavItem>
              </NavLink>
            </NavbarNav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default MainNav;
