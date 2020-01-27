import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import LoggedIn from "./pages/LoggedIn";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

import cookie from 'react-cookies';
import './App.css';


// const PrivateRoute = (component, ...props) => {
//   if (validateUser()) {
//     return (<Route exact path="/dashboard" component={component} />)
//   } else {
//     window.location.assign('/')
//   }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (

//     // Show the component only when the user is logged in
//     // Otherwise, redirect the user to /signin page
//     <Route {...rest} render={props => (
//       isLogin() ?
//         <Component {...props} />
//         : <Redirect to="/" />
//     )} />
//   );
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inSession: false,
      loggedUserName: "",
      carDeleted: false,
      loggedIn: false,
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
          loggedIn: true,
          userData: res
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
    axios("/api/users/validate").then(res => {

      console.log(res.data)
      this.setState({
        loggedIn: true,
        userData: res.data
      })
    })
  }

  isLogin = () => {
    return axios("/api/users/validate").then((res) => {
      console.log(res);
      if (res.success) {
        this.setState({
          loggedIn: true,
          userData: res
        })
      }
    })
  };

  render() {
    return (
      <Router>
        <div>
          <Nav isLoggedIn={this.state.inSession} loggedUserName={this.state.loggedUserName} />
          <Switch>
            <Route exact path="/" component={Books} />
            {/* <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={Detail} />
            <Route exact path="/users" component={LoggedIn} />
            <Route exact path="/users" component={LoggedIn} /> */}
            {console.log(this.state.userData)}
            {this.state.loggedIn && <Route exact path="/dashboard" component={LoggedIn} />}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
