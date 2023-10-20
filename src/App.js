import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

//Functional Components
import UserInfoFunction from './Components/FunctionalComponents/UserInfoFunction';
import RegisterFunction from './Components/FunctionalComponents/RegisterFunction';
import Todos from './Components/Hooks/Todos';
import TodosCreate from './Components/Hooks/TodosCreate';
import Memo from './Components/Hooks/Memo';
import Ref from './Components/Hooks/Ref';
import Reducer from './Components/Hooks/Reducer';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/RegisterFunction/:id' element={<RegisterFunction />} />
        <Route exact path='/' element={<RegisterFunction />} />
        <Route exact path='/UserInfoFunction' element={<UserInfoFunction />} />
        <Route exact path='/Todos' element={<Todos />} />
        <Route exact path='/Memo' element={<Memo />} />
        <Route exact path='/TodosCreate' element={<TodosCreate />} />
        <Route exact path='/Ref' element={<Ref />} />
        <Route exact path='/Reducer' element={<Reducer />} />
      </Routes>
    </>
  );
}

export default App;
