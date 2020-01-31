import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import { WeatherDashboard } from '../components/Weather/WeatherDashboard';
// import Survey from '../components/Survey'

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
    // console.log(this.state)
    return (
      <div>
         <Jumbotron>
          <h1>Welcome, {this.props.userData.username}
          </h1>
        </Jumbotron>
      <Container className="log" >
       
       
         
{/* <Survey /> */}
            <WeatherDashboard />

        
       
      </Container>
      </div>
    );
  }
}

export default LoggedIn;
