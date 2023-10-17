import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDetails from './Components/UserDetails/UserDetails';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route exact path='/' element={<UserDetails/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
