import React, { Component } from 'react';
import { Card, CardBody, CardImage, CardTitle, CardText, Fa } from 'mdbreact';
import './Individual.css';

class Individual extends Component {
  checkLogin() {
    if (localStorage.getItem('rrLoggedIn') !== 'true') {
      this.props.history.push('/login');
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      Individual: [],
    };
    this.checkLogin();
  }

  componentDidMount() {
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
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([movies, series]) =>
        this.setState({
          Individual: [...movies.items, ...series.items],
        }),
      );
  }

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="col-md-8 my-5 d-flex align-items-stretch">
          {this.state.Individual.map(title => {
            if (parseInt(this.props.match.params.id, 10) === title.id) {
              return (
                <Card key={title.id}>
                  <CardImage className="img-fluid movie-img-fit" src={`https://react-rent.herokuapp.com/${title.imageSrc}`} />
                  <CardBody>
                    <CardTitle>{title.title}</CardTitle>
                    <hr />
                    <CardText>{title.description}</CardText>
                    <h5 className="mt-4">{title.type.charAt(0).toUpperCase() + title.type.slice(1)} Details</h5>
                    <hr />
                    <h6 className="grey-text darken-1">
                      <Fa icon="clone" />
                      <span className="text-default"> Genre: </span> {title.genre}
                    </h6>
                    <h6 className="grey-text darken-1">
                      <Fa icon="star" />
                      <span className="text-default"> IMDb: </span> {title.rating}
                      /10
                    </h6>
                    <h6 className="grey-text darken-1">
                      <Fa icon="clock-o" />
                      <span className="text-default"> Released: </span>
                      {title.releaseDate}
                    </h6>
                    <h6 className="grey-text darken-1">
                      <Fa icon="toggle-right" />
                      <span className="text-default"> Length: </span>
                      {title.length}
                    </h6>
                    <hr />
                    <h5 className="mt-4">Watch</h5>
                    <hr />
                    <video className="video-fluid z-depth-1 movie-video-fit" loop controls poster={`https://react-rent.herokuapp.com/${title.imageSrc}`}>
                      <source src={title.videoSrc} type="video/mp4" />
                    </video>
                  </CardBody>
                </Card>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Individual;
