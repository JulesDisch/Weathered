import React, { Fragment } from "react";
import Modal from 'react-modal';
import API from "../../utils/API";
import "../RegisterModal/style.css"
import cookie from 'react-cookies'

const customStyles = {
  content: {
    backgroundColor: "#F0EECA",
    margin: "auto",
    padding: "20px",
    width: "50%",
    border: "1px solid #888",
    marginTop: "20%",
  }
};

Modal.setAppElement('#root');

export default class LogInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      username: "",
      password: "",
      userLoggedIn: false,
      loggedUserName: "",
      loginError: "",
      usernameBlank: false,
      passwordBlank: false,
      usernameInvalid: false,
      passwordInValid: false,
      isLoggedin: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.sendLoginFormData = this.sendLoginFormData.bind(this);
  }



  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }



  handleUserNameChange = (event) => {
    event.target.value ? this.setState({ usernameBlank: false, usernameInvalid: false }) : this.setState({ usernameBlank: true, usernameInvalid: true })
    this.setState({ username: event.target.value })
  }

  handlePassChange = (event) => {
    event.target.value ? this.setState({ passwordBlank: false, passwordInValid: false }) : this.setState({ passwordBlank: true, passwordInValid: true })
    this.setState({ password: event.target.value })
  }



  sendLoginFormData = (event) => {
    event.preventDefault()
    if (!this.state.usernameBlank && !this.state.passwordBlank) {
      API.saveUser({
        username: this.state.username, password: this.state.password
      }).then(res => {
        const data = res.data;
        console.log(data)
        if (data.incorrectUsername) {
          console.log("yeah")
          this.setState({ usernameInvalid: true })
          return
        }
        else if (res.data.incorrectPassword) {
          this.setState({ passwordInvalid: true })
        }
        this.props.checkStatus(res.data.inSession, res.data.loggedUserName)
        this.setState({ userLoggedIn: res.data.inSession, loggedUserName: res.data.loggedUserName, isLoggedin: true })
      }).catch(err => console.log(err))
    } else {
      this.setState({ usernameInvalid: true, passwordInValid: true })
    }
  }


  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("here")
    const userData = {
      username: this.state.username,
      password: this.state.password
    }
    API.logIn(userData).then(res => {
      console.log(res)
      console.log(`Hello ${this.state.username} `)
      if (res.data.token) {
        cookie.save("jwt_token", res.data.token)
        window.location.href = "/dashboard"
        console.log(`Hello ${this.state.username} `)
        this.setState({ isActive: false, isLoggedin: true, })
      }
    })
  };

  error = () => {
  }

  render() {

    return (
      <div>
        <button onClick={this.openModal}>Login</button>
        <Modal className="Modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <button id="close" onClick={this.closeModal}>&times;</button>
          <br></br>
          <h2 ref={subtitle => this.subtitle = subtitle}>Welcome back!</h2>
          <br></br>
          <div>
            {this.state.usernameInvalid && <div className='alert alert-warning' role="alert">
              <p> <i className='fa fa-exclamation-triangle'> </i> <strong> {this.state.usernameInvalid} problem</strong> </p>
            </div>
            }
            {!this.state.userLoggedIn && (
              <Fragment>
                <form>
                  <div className="form-group">
                    <input type='text' placeholder='Username' name='username' className={'form-control'} onChange={this.handleUserNameChange} id='usernameInput' />
                    {this.state.usernameBlank && <p className='input-err'> ** Username Required</p>}
                  </div>

                  <div className="form-group">

                    <input type='password' placeholder='Password' name='password' className={'form-control'} onChange={this.handlePassChange} id='passwordInput' />
                    {this.state.passwordBlank && <p className='input-err'> ** Password Required</p>}
                  </div>

                  <div className="form-group">
                    <button type='submit' onClick={this.handleFormSubmit} id='loginBtn'> Login </button>
                  </div>
                </form>
              </Fragment>)
            }
          </div>
        </Modal>
      </div>
    );
  }

}
