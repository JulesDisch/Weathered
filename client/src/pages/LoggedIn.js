import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import { WeatherDashboard } from '../components/Weather/WeatherDashboard';

class LoggedIn extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    API.getUser(this.props.match.params.id)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.props)
    // console.log(this.state)
    return (
      <Container fluid>
        <Jumbotron>
              <h1>You're logged in, {this.state.userData}

              </h1>
              <h1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">
                  🙄
              </span>
              </h1>
            </Jumbotron>
        <Row>
          <Col size="md-12">
            
            <WeatherDashboard />
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoggedIn;
