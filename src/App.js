import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

//Functional Components
import UserInfoFunction from './Components/FunctionalComponents/UserInfoFunction';
import RegisterFunction from './Components/FunctionalComponents/RegisterFunction';


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/RegisterFunction/:id' element={<RegisterFunction />} />
        <Route exact path='/' element={<RegisterFunction />} />
        <Route exact path='/UserInfoFunction' element={<UserInfoFunction />} />
      </Routes>
    </>
  );
}

export default App;
