
import React, { useState, useEffect } from 'react';
import '../Styles/UserInfo.css';
import UserCard from '../UserCard/UserCard';
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
            <div className='row'>
                {userDetails.map((user) => (
                    <UserCard user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
};

export default UserInfoFunction;

