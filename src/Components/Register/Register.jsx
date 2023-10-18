import React, { Component } from 'react';
import { withRouter } from '../Navigate/withRouter';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userDesignation: '',
      userDob: '',
      age: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userDob') {
      const age = this.calculateAge(value);
      this.setState({
        [name]: value,
        age: age,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };


  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userDesignation: this.state.userDesignation,
      userDob: this.state.userDob,
      age: this.state.age,
    };

    fetch('http://localhost:3000/UserDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data sent to the Data:', data);
        this.props.navigate('/UserInfo')
      })
      .catch((error) => {
        console.error('Error sending data to the server:', error);
      });
  };

  render() {
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'left',
    };

    const labelStyle = {
      color: 'red',
      marginBottom: '8px',
    };

    const inputStyle = {
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: '8px',
      marginBottom: '16px',
      width: '100%',
    };

    return (
      <form onSubmit={this.handleSubmit} style={formStyle} className='mt-5'>
        <div>
          <label style={labelStyle}>
            User Name:
            <input
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleInputChange}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            User Email:
            <input
              type="email"
              name="userEmail"
              value={this.state.userEmail}
              onChange={this.handleInputChange}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            User Designation:
            <input
              type="text"
              name="userDesignation"
              value={this.state.userDesignation}
              onChange={this.handleInputChange}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            User Date of Birth:
            <input
              type="date"
              name="userDob"
              value={this.state.userDob}
              onChange={this.handleInputChange}
              style={inputStyle}
              required
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            Age:
            <input
              type="text"
              name="age"
              value={this.state.age}
              style={inputStyle}
              readOnly
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(Register);
