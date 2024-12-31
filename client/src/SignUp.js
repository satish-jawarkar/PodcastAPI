import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({username : '', email : '', password : ''});
    const[msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:1000/signup', formData);
            setMsg(response.data.message);
            navigate('/signin');
        }
        catch(e){
            console.log(`Error ${e}`);
        }
    }
  return (
    <div className='signup'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='username' placeholder='Enter an Username' onChange={handleChange}/>
            <input type='text' name='email' placeholder='Enter an Email' onChange={handleChange}/>
            <input type='text' name='password' placeholder='Enter the password' onChange={handleChange}/>
            <button type="submit"> Sign Up </button>
            <p>{msg}</p>
        </form>
    </div>
  )
}

export default SignUp