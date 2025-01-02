import './App.css';
import { useState } from 'react';
import react from 'react';
import SignIn from './SignIn';

import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/signin1' element={<SignIn setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path='/signup1' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>

        <Route path='/Home' element={isLoggedIn ? <Home/> : <Navigate to="/signin"/> } />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
