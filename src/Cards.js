import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Container, Fa, Row } from 'mdbreact';
import './Cards.css';
import { Link } from 'react-router-dom';

class Cards extends Component {
  keyDown = event => {
    let selected = document.activeElement;
    let parent = selected.parentElement;
    const mainDiv = document.querySelector('#mainDiv');
    const firstCard = document.querySelector('.card');

    if (!mainDiv.contains(selected)) {
      return firstCard.focus();
    } else {
      switch (event.key) {
        case 'ArrowDown':
          if (parent.nextElementSibling !== null) {
            parent.nextElementSibling.firstChild.focus();
          }
          break;

        case 'ArrowRight':
          if (parent.nextElementSibling !== null) {
            parent.nextElementSibling.firstChild.focus();
          }
          break;

        case 'ArrowUp':
          if (parent.previousElementSibling !== null) {
            parent.previousElementSibling.firstChild.focus();
          }
          break;

        case 'ArrowLeft':
          if (parent.previousElementSibling !== null) {
            parent.previousElementSibling.firstChild.focus();
          }
          break;

        case 'Enter':
          selected.getElementsByTagName('button')[0].click();
          break;

        default:
          break;
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false);
  }

  render() {
    return (
      <Container className="my-5" id="mainDiv">
        {this.props.loaded ? (
          <Row>
            {this.props.data.sort((a, b) => a.title.localeCompare(b.title)).map(movie => (
              <div className="col-md-4 mt-4 d-flex align-items-stretch" key={movie.id}>
                <Card tabIndex="0">
                  <Link to={`/titles/${movie.id}`}>
                    <CardImage className="img-fluid img-fit" src={`https://react-rent.herokuapp.com/${movie.imageSrc}`} />
                  </Link>
                  <CardBody>
                    <Link to={`/titles/${movie.id}`}>
                      <CardTitle id="mytitle" className="text-default">
                        {movie.title}
                      </CardTitle>
                    </Link>
                    {movie.type === 'movie' ? (
                      <h6 className="indigo-text">
                        <Fa icon="video-camera" /> Movie
                      </h6>
                    ) : (
                      <h6 className="indigo-text">
                        <Fa icon="tv" /> Series
                      </h6>
                    )}
                    <CardText id="description">{movie.description}</CardText>
                  </CardBody>
                  <Link className="text-white text-center mb-4" to={`/titles/${movie.id}`}>
                    <Button className="bottom-button">Details</Button>
                  </Link>
                </Card>
              </div>
            ))}
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default Cards;
