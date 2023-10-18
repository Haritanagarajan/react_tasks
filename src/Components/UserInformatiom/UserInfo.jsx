import React, { Component } from 'react';
import '../Styles/UserInfo.css';
import { Link } from 'react-router-dom';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/UserDetails')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ userDetails: data });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <div>
                <h1 className='usertable d-flex justify-content-center mt-5 mb-3'>User Details Table</h1>
                <table className="user-details-table">
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>UserEmail</th>
                            <th>UserDesignation</th>
                            <th>DateOfBirth</th>
                            <th>Age</th>
                            <th>UserInfo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userDetails.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userName}</td>
                                <td>{user.userEmail}</td>
                                <td>{user.userDesignation}</td>
                                <td>{user.userDob}</td>
                                <td>{user.age}</td>
                                <Link to={`/SpecificUserInfo/${user.id}`} style={{ textDecoration: 'none' }}>
                                    <button className='btn btn-primary ms-5 mt-2'>UserInfo</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        );
    }
}

export default UserInfo;
