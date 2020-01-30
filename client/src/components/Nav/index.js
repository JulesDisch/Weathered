import React from "react";
import RegisterModal from "../RegisterModal";
import LogInModal from "../LogInModal";
import LogOutBtn from "../LogOutBtn";
import "../Nav/style.css"

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <ul className="nav navbar-nav"><LogOutBtn /></ul>;
    } else {
      button = <ul className="nav navbar-nav"><li> <LogInModal /> </li> <li> <RegisterModal /></li> </ul>
    }

    return (
      <nav className="navbar fixed-top navbar-expand  border-bottom border-width-2">
        <a className="navbar-brand" href="/">
          Weather Wear 
      </a>
        <div className="collapse navbar-collapse justify-content-end">
          {button}
        </div>
      </nav>
    );
  }
}

