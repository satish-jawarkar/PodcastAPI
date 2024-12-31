import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn ({setIsLoggedIn}) {
    const [formData, setFormData] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:1000/signin', formData);
            if(response.status === 200){
                setIsLoggedIn(true);
                navigate('/home');
            }
        }
        catch(err){
            console.log(`Unexpected ${err}`);
        }
    };
  return (
    <div className='SignIn'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='email' placeholder='Enter your email!' onChange={handleChange}/>
            <input type='text' name='password' placeholder='Enter your password!' onChange={handleChange}/>
            <button type='submit'>Log IN</button>
        </form>
    </div>
  )
}

export default SignIn