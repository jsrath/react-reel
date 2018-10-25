import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import logo from './logo.svg';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleFormChanges = event => {
    event.target.name === 'email' ? this.setState({ email: event.target.value }) : this.setState({ password: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email === 'test' && this.state.password === 'test') {
      this.props.logIn();
      this.props.history.push('/');
    } else {
      alert('Nope');
    }
  };

  componentDidMount() {
    localStorage.setItem('rrLoggedIn', false);
  }

  render() {
    return (
      <div className="Login">
        <Container className="mt-5">
          <form className="form-simple" onSubmit={this.handleSubmit}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col md="5" className="text-center">
                <Card>
                  <div className="header py-4 default-color">
                    <Row className="d-flex justify-content-center">
                      <img src={logo} alt="logo" />
                    </Row>
                  </div>
                  <CardBody className="mx-4 mt-4">
                    <p className="grey-text">To use the application, login with 'test' & 'test'</p>
                    <Input label="Email" name="email" value={this.state.email} onChange={this.handleFormChanges} group type="text" validate />
                    <Input label="Password" name="password" value={this.state.password} onChange={this.handleFormChanges} group type="text" validate />
                    <div className="text-center mb-4 mt-5">
                      <Button type="submit" className="default-color btn-block z-depth-2">
                        Log in
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
