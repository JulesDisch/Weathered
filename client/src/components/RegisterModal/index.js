import React from "react";
import Modal from 'react-modal';
import API from "../../utils/API";
import axios from 'axios';
import "./style.css"





const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)'
    backgroundColor: "#F0EECA",
    margin: "auto",
    padding: "20px",
   
    width: "50%",
    border: "1px solid #888",
    marginTop: "100px",
    // textAlign: "center",
  }
};

Modal.setAppElement('#root');

export default class RegisterModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      users: [],

      username: "",
      email: "",
      password: "",
      passwordConf: "",
      usernameBlank: false,
      emailBlank: false,
      passwordBlank: false,
      passwordConfBlank: false,
      usernameInvalid: false,
      emailInvalid: false,
      passwordInValid: false,
      passwordConfInValid: false,
      passwordsDontMatch: false,
      userNameTaken: false,
      takenUsernameVal: "",
      emailTaken: false,
      takenEmailVal: false,
      searchResults: [],
      allRegEmails: [],
      allRegUsernames: [],
      regSuccess: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.sendSignupFormData = this.sendSignupFormData.bind(this)
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

  componentDidMount() {
    this.getAllEmail()
  }

  deleteAlert = () => {
    var alertModal = document.getElementById("alert");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      alertModal.style.display = "none";
  }
  };

  getAllEmail = () => {
    API.getUsers().then((res) => {
      res.data.map(row => (
        this.setState({ allRegEmails: [...this.state.allRegEmails, row.email], allRegUsernames: [...this.state.allRegUsernames, row.username] })
      ))
    }).catch(err => console.log(err))
  }

  checkUsernameTaken = (searchQuery) => {
    var searchRes = this.state.allRegUsernames;
    const result = searchRes.find(username => username === searchQuery)
    if (result) {
      this.setState({ userNameTaken: true, takenUsernameVal: searchQuery }, console.log("already taken"))
    }
  }

  checkEmailTaken = (searchQuery) => {
    var searchRes = this.state.allRegEmails;
    const result = searchRes.find(email => email === searchQuery)
    if (result) {
      this.setState({ emailTaken: true, takenEmailVal: searchQuery },
        console.log("already taken"))
    }
  }


  formValid = () => {
    const { username, email, password, passwordConf } = this.state;
    let valid = true;
    // refactor to be more dry and reset upon submit
    if (!username) {
      this.setState({ usernameBlank: true })
      valid = false
    }
    if (!email) {
      this.setState({ emailBlank: true })
      valid = false
    }
    if (!password) {
      this.setState({ passwordBlank: true })
      valid = false
    }
    if (!passwordConf) {
      this.setState({ passwordConfBlank: true })
      valid = false
    }
    return valid;
  }


  passwordsMatch = () => {
    if (this.state.password !== this.state.passwordConf) {
      return false;
    } else {
      return true
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
    this.checkUsernameTaken(value)
    this.checkEmailTaken(value)
  }

  sendSignupFormData = (event) => {
    event.preventDefault();

    if (!this.formValid()) {
      return
    } else if (!this.passwordsMatch()) {
      this.setState({ passwordsDontMatch: true })
      return
    }

    API.saveUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      const data = res.data;
      console.log(data.success)
      if (data.success) {
        console.log("here")
        // this.setState({ regSuccess: true })

        window.location.href = "/dashboard"
        //   + this.state.username;
        console.log(`Hello ${data.username} ${data.id} `)
        console.log(data)
        console.log(`Hello ${this.state.username} ${data.id} `)
        alert(`Hello ${data.username} ${data.id} `);
        this.loggedIn()
        this.Checked()
      }
    })
      .catch(err => console.log(err))
    
  }



  loggedIn = (event) => {
    event.preventDefault()
    if (!this.state.usernameBlank && !this.state.passwordBlank) {
      axios.post('/api/user/login', {
        username: this.state.username, password: this.state.password
      }).then(res => {
        if (res.data.incorrectUsername || res.data.incorrectPassword) {
          this.setState({ loginError: res.data.msg })
        }
        this.props.checkStatus(res.data.inSession, res.data.loggedUserName)
        this.setState({ userLoggedIn: res.data.inSession, loggedUserName: res.data.loggedUserName })
      }).catch(err => console.log(err))
    } else {
      this.setState({ usernameInvalid: true, passwordInValid: true })
    }
  }

  Checked() {
    API.getUser(this.props.match.params.id)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  render() {

    return (



      <div >
        <button onClick={this.openModal}>Register</button>
        <Modal className="Modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Register Modal"
        >
          <button id="close" onClick={this.closeModal}>&times;</button>
          <br></br>
          <h2 ref={subtitle => this.subtitle = subtitle}>Create a personal profile</h2>
          <br></br>


          <div>
            <div className='new'>
              <form>

                {this.state.passwordsDontMatch &&
                  <div className='alert alert-danger alert-dismissible' role="alert">
                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span >&times;</span></button> */}
                    <p> <i className='fa fa-exclamation-triangle'> </i> Passwords Don't Match! </p>
                  </div>
                }

                {this.state.userNameTaken &&
                  <div className='alert alert-danger alert-dismissible' role="alert">
                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span >&times;</span></button> */}
                    <p> <i className='fa fa-exclamation-triangle'> </i> Username <strong> {this.state.takenUsernameVal} </strong> is already taken</p>
                  </div>
                }

                {this.state.emailTaken &&
                  <div className='alert alert-danger alert-dismissible' role="alert">
                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> */}
                    <p> <i className='fa fa-exclamation-triangle'> </i> Email <strong> {this.state.takenEmailVal} </strong> already has an account</p>
                  </div>
                }

                {/* {this.state.regSuccess &&
                  <div className='alert alert-success alert-dismissible' role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <p> <i className='fa fa-check'> </i> Registration Successful for {this.state.username} </p>

                    <p> Please <NavLink to='/login'>Login</NavLink> with your credentials</p>
                  </div>
                } */}

                <div className="form-group">
                 
                  <input type='text' placeholder='Username' name='username' className={'form-control'} onChange={this.handleChange} id='usernameInput' />
                  {this.state.usernameBlank && <p className='input-err'> ** UserName Required</p>}
                </div>

                <div className="form-group">
                 
                  <input type='text' placeholder='Email' name='email' className={'form-control'} onChange={this.handleChange} id='emailInput' />
                  {this.state.emailBlank && <p className='input-err'> ** Email Required</p>}
                </div>

                <div className="form-group">
                 
                  <input type='password' placeholder='Password' name='password' className={'form-control'} onChange={this.handleChange} id='passwordInput' />
                  {this.state.passwordBlank && <p className='input-err'> ** Password Required</p>}
                </div>

                <div className="form-group">
                 
                  <input type='password' placeholder='Confirm your password' name='passwordConf' className={'form-control'} onChange={this.handleChange} id='passwordConfInput' />
                  {this.state.passwordConfBlank && <p className='input-err'> ** Password Confirmation Required</p>}
                </div>

                <div className="form-group">
                  <button type='submit' onClick={this.sendSignupFormData} id='createUserBtn'>
                    Sign Up </button>
                
                </div>
              </form>
            </div>

          </div>
        </Modal>
      </div >
    );
  }
}