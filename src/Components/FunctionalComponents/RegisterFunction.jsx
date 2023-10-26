import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../Styles/Register.css';
import { Link } from 'react-router-dom';


const RegisterFunction = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = new URLSearchParams(useLocation().search).get('isEdit');
    const isView = new URLSearchParams(useLocation().search).get('isView');
    const [isAddingUser, setIsAddingUser] = useState(true);
    const [isViewOnly, setisViewOnly] = useState(false);

    useEffect(() => {
        if (id) {
            setIsAddingUser(false);
            fetch(`http://localhost:3000/UserDetails/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setState({
                        userName: data.userName,
                        userEmail: data.userEmail,
                        userDesignation: data.userDesignation,
                        userDob: data.userDob,
                        age: calculateAge(data.userDob),
                    });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            setisViewOnly(isView === 'true');
        } else {
            setisViewOnly(isEdit === 'true');
        }
    }, [id, isEdit, isView]);

    const [state, setState] = useState({
        userName: '',
        userEmail: '',
        userDesignation: '',
        userDob: '',
        age: '',
    });

    const handleInputChange = (event) => {

        const { name, value } = event.target;
        if (name === 'userDob') {

            const age = calculateAge(value);

            setState({
                ...state,
                [name]: value,
                age: age,
            });
        } else {
            setState({
                ...state,
                [name]: value,
            });
        }
    };

    const calculateAge = useMemo(() => {
        return (dateString) => {
            const today = new Date();
            const birthDate = new Date(dateString);
            const age = today.getFullYear() - birthDate.getFullYear();
            if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
                return age - 1;
            }
            return age;
        };
    }, []);

    const handleSaveMode = (e) => {
        e.preventDefault();
        const userDataEdit = {
            userName: state.userName,
            userEmail: state.userEmail,
            userDesignation: state.userDesignation,
            userDob: state.userDob,
            age: state.age,
        };

        if (!isAddingUser) {
            fetch(`http://localhost:3000/UserDetails/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataEdit),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Data sent to the Data:', data);
                    navigate('/UserInfoFunction');
                })
                .catch((error) => {
                    console.error('Error sending data to the server:', error);
                });
        } else {
            console.log("Save permissions required")
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            userName: state.userName,
            userEmail: state.userEmail,
            userDesignation: state.userDesignation,
            userDob: state.userDob,
            age: state.age,
        };
        if (isAddingUser) {
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
                    navigate('/UserInfoFunction');
                })
                .catch((error) => {
                    console.error('Error sending data to the server:', error);
                });
        }

    };

    return (
        <div className='text-white'>
            <h3 className='d-flex justify-content-center mt-5'>User Forms</h3>
            <div className='registerdiv d-flex justify-content-center'>
                <form onSubmit={handleSubmit}>
                    <div className='modules'>
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={state.userName}
                            onChange={handleInputChange}
                            required
                            readOnly={isViewOnly}
                        />
                    </div>
                    <div className='modules'>
                        <label htmlFor="userEmail">User Email:</label>
                        <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            value={state.userEmail}
                            onChange={handleInputChange}
                            required
                            readOnly={isViewOnly}
                        />
                    </div>
                    <div className='modules'>
                        <label htmlFor="userDesignation">User Designation:</label>
                        <input
                            type="text"
                            name="userDesignation"
                            id="userDesignation"
                            value={state.userDesignation}
                            onChange={handleInputChange}
                            required
                            readOnly={isViewOnly}
                        />
                    </div>
                    <div className='modules'>
                        <label htmlFor="userDob">User Date of Birth:</label>
                        <input
                            type="date"
                            name="userDob"
                            id="userDob"
                            value={state.userDob}
                            onChange={handleInputChange}
                            required
                            readOnly={isViewOnly}
                        />
                    </div>
                    <div className='modules'>
                        <label htmlFor="age">
                            Age:
                            <input
                                type="text"
                                name="age"
                                value={state.age}
                                readOnly
                            />
                        </label>
                    </div>
                    {isAddingUser ? (
                        <button type="submit" className='registerfuncbutton'>
                            Add User
                        </button>
                    ) : (
                        <button className='editmode btn' onClick={handleSaveMode}>
                            Save
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterFunction;

