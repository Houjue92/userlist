import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../node_modules/axios';
import { getCurrentUser } from '../../actions/currentUser';

const style = {
  width: '50%',
  float: 'left'
};
const formStyle = {
  margin: 'auto',
  padding: '50px',
};
const rowStyle = {
  margin: '10px',
  width: '300px',
  height: '100px',
  padding: '10px',
};



class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {firstName:'', lastName:'', sex:'', age:'', passWord:''};
  }

  
  componentDidMount() {
    const {userId} = this.props.match.params;
    console.log(userId);
    axios({ method: 'get', url: 'http://localhost:8080/api/users/' + userId})
      .then(response => {
        console.log(response);
        this.setState({ firstName: response.data.firstName, lastName: response.data.lastName, 
          sex: response.data.sex, age: response.data.age, passWord: response.data.passWord});
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
    // const { dispatch } = this.props;
    // dispatch(getCurrentUser(userId));
  };
  
  handleInputChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    this.setState({[nam]: val});
  };
 
  
  handleSubmit = e => {
    const {userId} = this.props.match.params;
    e.preventDefault(); // prevent Default HTML action
    axios
    .put('http://localhost:8080/api/users/' + userId, { firstName: this.state.firstName, lastName: this.state.lastName,
    sex: this.state.sex, age: this.state.age, passWord: this.state.passWord })
    .then(response => {
      console.log(response);
      if(response.request.status === 200) {
        this.props.history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
    });
    
  };


  render() {
    let currentUserUI;
    currentUserUI = (
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <div style={rowStyle}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Sex:
            <input
              type="text"
              name="sex"
              value={this.state.sex}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Age:
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Password:
            <input
              type="text"
              name="passWord"
              value={this.state.passWord}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Repeat
            <input
              type="text"
              name="repeat"
              value={this.state.passWord}
              onChange={this.handleInputChange}
            />
          </label>
        </div>

        <div style={rowStyle}>
          <input type="submit" value="Save Changes" />
        </div>
      </form>
    );
    // const { currentUser } = this.props;
    // console.log(currentUser);
    // let currentUserUI;
    // if (currentUser.isLoading) {
    //   currentUserUI = <p>Loading</p>;
    // } else if (currentUser.error !== '') {
    //   currentUserUI = <p style={{ color: 'red' }}>{currentUser.error}</p>;
    // } else if (currentUser.data.id) {

    // }
    return (
      <div style={style}>
        <h3>Edit User</h3>
        {currentUserUI}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(UserDetail);
