import React, { Component } from 'react';
import withParams from '../Navigate/withParams';
import { Link } from 'react-router-dom';

class SpecificUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            isEditMode: false,
            editableUserDetails: {},
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/UserDetails/${this.props.params.id}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ userDetails: data, editableUserDetails: data });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    toggleEditMode = () => {
        this.setState((prevState) => ({
            isEditMode: !prevState.isEditMode,
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
    
        this.setState((prevState) => ({
            editableUserDetails: {
                ...prevState.editableUserDetails,
                [name]: value,
            },
        }));
    };

    saveChanges = () => {
        fetch(`http://localhost:3000/UserDetails/${this.props.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.editableUserDetails),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userDetails: data,
                    editableUserDetails: data
                });
                this.toggleEditMode();
            })
            .catch((error) => {
                console.error('Error saving data:', error);
            });
    };

    render() {
        const { isEditMode, editableUserDetails } = this.state;

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
                            <th>{isEditMode ? "Save" : "Edit"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="userName"
                                        value={editableUserDetails.userName}
                                        onChange={this.handleInputChange}
                                    />
                                ) : (
                                    editableUserDetails.userName
                                )}
                            </td>
                            <td>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="userEmail"
                                        value={editableUserDetails.userEmail}
                                        onChange={this.handleInputChange}
                                    />
                                ) : (
                                    editableUserDetails.userEmail
                                )}
                            </td>
                            <td>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="userDesignation"
                                        value={editableUserDetails.userDesignation}
                                        onChange={this.handleInputChange}
                                    />
                                ) : (
                                    editableUserDetails.userDesignation
                                )}
                            </td>
                            <td>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="userDob"
                                        value={editableUserDetails.userDob}
                                        onChange={this.handleInputChange}
                                    />
                                ) : (
                                    editableUserDetails.userDob
                                )}
                            </td>
                            <td>
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="age"
                                        value={editableUserDetails.age}
                                        onChange={this.handleInputChange}
                                    />
                                ) : (
                                    editableUserDetails.age
                                )}
                            </td>
                            <td>
                                {isEditMode ? (
                                    <button className='btn btn-primary ms-3 mt-2 mb-2' onClick={this.saveChanges}>
                                        Save
                                    </button>
                                ) : (
                                    <button className='btn btn-primary ms-3 mt-2 mb-2' onClick={this.toggleEditMode}>
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withParams(SpecificUserInfo);
