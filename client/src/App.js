import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Books from "./pages/Books";

import LoggedIn from "./pages/LoggedIn";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import cookie from 'react-cookies';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inSession: false,
      loggedUserName: "",
      isLoggedIn: false,
      isActive: true,
      userData: {}
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.destroyUserSession = this.destroyUserSession.bind(this)
  }

  componentDidMount() {
    const token = cookie.load('jwt_token')
    if (token) {
      axios.post("/api/users/validate", { token }).then((res) => {
        console.log(res)
        this.setState({
          isLoggedIn: true,
          userData: res.data,
          isActive: false
        })

      })
    }
  }

  checkInSession = () => {
    axios.get('/api/users').then((res) => {
      this.setState({ inSession: res.data.inSession });
    }).catch(err => console.log(err));
  }

  updateStatus = (boolStatus, username) => {
    this.setState({ inSession: boolStatus, loggedUserName: username });
  }

  destroyUserSession = (boolStatus) => {
    this.setState({ inSession: boolStatus })
  }

  validateUser = () => {
    axios.get("/api/users/validate").then(res => {
      console.log(res.data)
      this.setState({
        isLoggedIn: true,
        userData: res.data
      })
    })
  }

  isLogin = () => {
    return axios.get("/api/users/validate").then((res) => {
      console.log(res);
      if (res.success) {
        this.setState({
          isLoggedIn: true,
          userData: res
        })
      }
    })
  };

  render() {
    return (
      <Router>
        <div>
          <Nav isLoggedIn={this.state.isLoggedIn} loggedUserName={this.state.loggedUserName} />
          <Switch>
            <Route exact path="/" component={Books} />
            {this.state.isLoggedIn &&  <Route exact path="/dashboard" render={(props) => <LoggedIn {...props} userData={this.state.userData} />} />}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
