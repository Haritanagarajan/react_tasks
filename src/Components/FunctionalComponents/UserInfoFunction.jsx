import React, { useState, useEffect } from 'react';
import '../Styles/UserInfo.css';
import { Link } from 'react-router-dom';

const UserInfoFunction = () => {

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/UserDetails')
            .then((response) => response.json())
            .then((data) => {
                setUserDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    return (
        <div className='container'>
            {userDetails.map((user) => (
                <div className='col'>
                    <div className='card mt-5' style={{ width: 400 }}>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <p><strong>UserName:</strong> {user.userName}</p>
                                </div>
                                <div className='col-6'>
                                    <p><strong>UserEmail:</strong> {user.userEmail}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <p><strong>DateOfBirth:</strong> {user.userDob}</p>
                                </div>
                                <div className='col-6'>
                                    <p><strong>UserDesignation:</strong> {user.userDesignation}</p>
                                </div>
                            </div>
                            <Link to={`/RegisterFunction/${user.id}`} style={{ textDecoration: 'none' }}>
                                <button className='btn btn-success mt-2'>Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    );
};

export default UserInfoFunction;
