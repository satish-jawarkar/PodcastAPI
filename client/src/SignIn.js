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
        console.log("Form Data:", formData);
    
        try {
            const response = await axios.post('http://localhost:1000/signin', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);
    
            if (response.status === 200) {
                setIsLoggedIn(true);
                navigate('/home');
            }
        } catch (err) {
            if (err.response) {
                console.log("Error Response Data:", err.response.data);
                console.log("Error Status:", err.response.status);
            } else {
                console.log("Error:", err.message);
            }
        }
    };
    
  return (
    <div className='SignIn'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='email' placeholder='Enter your email!' onChange={handleChange}/>
            <input type='password' name='password' placeholder='Enter your password!' onChange={handleChange}/>
            <button type='submit'>Log IN</button>
        </form>
    </div>
  )
}

export default SignIn