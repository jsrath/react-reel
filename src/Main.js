import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MainNav from './MainNav';
import Cards from './Cards';
import Individual from './Individual';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      loaded: false,
      movies: [],
      series: [],
      all: [],
    };
  }

  checkLogin = () => {
    if (localStorage.getItem('rrLoggedIn') !== 'true') {
      localStorage.setItem('rrLoggedIn', true);
    }
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };

  logIn = () => {
    localStorage.setItem('rrLoggedIn', true);
    this.setState({ loggedIn: true });
  };

  getData = () => {
    Promise.all([
      fetch('https://react-rent.herokuapp.com/api/movie', {
        headers: new Headers({
          'X-SimpleOvpApi': 'USER_KEY_2',
        }),
      }),
      fetch('https://react-rent.herokuapp.com/api/serie', {
        headers: new Headers({
          'X-SimpleOvpApi': 'USER_KEY_2',
        }),
      }),
    ])
      .then(([movies, series]) => Promise.all([movies.json(), series.json()]))
      .then(([movies, series]) =>
        this.setState({
          movies: [...movies.items],
          series: [...series.items],
          all: [...movies.items, ...series.items],
          loaded: true,
        }),
      );
  };

  componentDidMount() {
    this.checkLogin();
    this.getData();
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn ? (
          <div className="Main">
            <MainNav loaded={this.state.loaded} logOut={this.logOut} />
            <div className="container">
              <Switch>
                <Route exact path="/" render={props => <Cards {...props} loaded={this.state.loaded} data={this.state.all} />} />
                <Route exact path="/titles/:id" component={Individual} />
                <Route exact path="/movies" render={props => <Cards {...props} loaded={this.state.loaded} data={this.state.movies} />} />
                <Route exact path="/series" render={props => <Cards {...props} loaded={this.state.loaded} data={this.state.series} />} />
              </Switch>
            </div>
          </div>
        ) : (
          <Login logIn={this.logIn} />
        )}
      </Router>
    );
  }
}

export default Main;
