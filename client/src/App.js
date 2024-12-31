import './App.css';
import { useState } from 'react';
import react from 'react';
import SignIn from './SignIn';
import SignUp from './Signup';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/signin' element={<SignIn setIsLoggedIn = {setIsLoggedIn}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>

        <Route path='/Home' element={isLoggedIn ? <Home/> : <Navigate to="/signin"/> } />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
