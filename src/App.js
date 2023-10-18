import './App.css';
import { UserDetails } from './Components/UserDetails/UserDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Register from './Components/Register/Register';
import UserInfo from './Components/UserInformatiom/UserInfo';
import  SpecificUserInfo  from './Components/UserInformatiom/SpecificUserInfo';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/UserDetails' element={<UserDetails />} />
        <Route exact path='/' element={<Register />} />
        <Route exact path='/UserInfo' element={<UserInfo />} />
        <Route exact path='/SpecificUserInfo/:id' element={<SpecificUserInfo />} />
      </Routes>
    </>
  );
}

export default App;
