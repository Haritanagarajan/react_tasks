import { Link } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';

const UserCard = ({ user }) => {
    return (
        <div className='col-md-6' key={user.id} >
            <Link to={`/RegisterFunction/${user.id}?isView=true`} style={{ textDecoration: 'none' }}>
                <div className='card mt-5 text-dark fw-bold' style={{ backgroundColor: '#ff99c2' }}>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-6'>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }} >
                                    <Avatar variant="solid" style={{ width: '90px', height: '90px' }} />
                                </Box>
                            </div>
                            <div className='col-6'>
                                <Link to={`/RegisterFunction/${user.id}?isEdit=true`} style={{ textDecoration: 'none', float: 'right' }}>
                                    <i className="fa-solid fa-pen-to-square" style={{ color: 'black' }}></i>
                                </Link>
                                <p >{user.userName}</p>
                                <p>{user.userEmail} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default UserCard;
