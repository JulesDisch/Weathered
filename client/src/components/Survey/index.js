import React from "react";
// import {
//   useInput,
//   useBoolean,
//   useNumber,
// } from "react-hanger";
import API from "../../utils/API";
import DatePicker from "../DatePicker";

export default class Survey extends React.Component {
    constructor(props) {
        super(props);
//         this.state = {
//             birthdayBlank: false,
//         birthday: "",
//   commute: "",
//   run: "",
//   clothes: ""
//         }
//         this.handleBirthdayChange = this.handleBirthdayChange.bind(this);}
this.state = {
    birthday: "",
  commute: "",
  run: "",
  clothes: ""
}
this.handleInputChange = this.handleInputChange.bind(this)
this.sendFormData = this.sendFormData.bind(this)
    }
// Survey() {
//   const birthday = useInput("");
//   const commute = useNumber(0);
//   const run = useNumber(0);
//   const clothes = useNumber(0);
//   const showComment = useBoolean(false);
//   const comment = useInput("");
//   const feeling = useInput("");
//   const rating = useNumber(0)
handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

handleBirthdayChange = (event) => {
    event.target.value ? this.setState({ birthdayBlank: false,  }) : this.setState({ birthdayBlank: true })
    this.setState({ birthday: event.target.value })
    
  }

  sendFormData = (event) => {
    event.preventDefault();
    
    API.savePreference({
        birthday: this.state.birthday,
        commute: this.state.commute,
        run: this.state.run.value,
        clothes: this.state.clothes.value
    }).then(res => {
      const data = res.data;
      console.log(data.success)
      if (data.success) {
        // this.setState({ userLoggedIn: data.inSession, loggedUserName: data.loggedUserName, isLoggedin: true })
        this.handleSubmit();
        
      }
    })
      .catch(err => console.log(err))
  }



  handleSubmit = event => {
    event.preventDefault();
    alert(`commute: ${this.state.birthday}\ncommute: ${this.state.commute}`);
    const form = {
      birthday: this.state.birthday,
      commute: this.state.commute,
      run: this.state.run,
      clothes: this.state.clothes
    }
    // API.savePreferences({
    //     birthday: this.state.birthday,
    //     commute: this.state.commute,
    //     run: this.state.run.value,
    //     clothes: this.state.clothes.value
    // }).then (res => {
    //     const data = res.data;
    //     console.log ("success")
    //     this.setState({birthday: data.birthday, commute: data.commute, run: data.run, clothes: data.clothes})
    // })


    console.log(form)
  }


  render() {

  return (
    <div className="container">
      <h1>Fill out this survey to find out what to wear this week!</h1>
      
      <h4>When is your birthday?</h4>
      
      <DatePicker selected={this.handleBirthdayChange} onChange={this.handleBirthdayChange} />
      {/* <date {...this.birthday.eventBind} /> */}

      <h4>What is your commute like?</h4>
      <div className="form-group" >
        <input type="radio" name="Public transit" value='Public transit' onChange={this.handleInputChange} />Public transit
        {/* <input type="radio" name="rating-1" onChange={() => this.commute.setValue(2)} />Personal vehicle
        <input type="radio" name="rating-1" onChange={() => this.commute.setValue(3)} />I walk
        <input type="radio" name="rating-1" onChange={() => this.commute.setValue(4)} />A mixture
        <input type="radio" name="rating-1" onChange={() => this.commute.setValue(5)} />N/A */}
      </div>
      
      {/* <h4>How did our product make you feel?</h4>
      <div className="form-group emoji" >
        <span role="img" aria-label="angry" 
          onClick={() => {showComment.toggle(); feeling.setValue("angry")} }>
            😠
        </span>
        <span role="img" aria-label="indifferent"
          onClick={() => {showComment.toggle(); feeling.setValue("indifferent")}}>
            😒
        </span>
        <span role="img" aria-label="happy"
          onClick={() => {showComment.toggle(); feeling.setValue("happy")}}>
            😄
        </span>
        <div className="response">
        {showComment.value ? (
          <textarea {...comment.eventBind} placeholder="Please add any additional comments" />
        ): null}
        </div>
        <div>
      {showComment.value ? (
          <span>You've responded that you feel {feeling.value}</span>
        ): null}
      </div>
      </div> */}
      <button onClick={this.sendFormData}>Submit</button>
    </div>
  );
}
}

