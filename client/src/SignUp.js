import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({username : '', email : '', password : ''});
    const[msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // JSON.stringify(formData);
        console.log("Form Data:", formData);
        try{
            
            const response = await axios.post('http://localhost:1000/signup', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMsg(response.data.message);
            // console.log(response.status);
            console.log(msg);
            navigate('/signin1');
        }
        catch(e){
            console.log(`Error 1 ${e.message}`);
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Form Data:", formData);
    //     try {
    //         const response = await axios.post('http://localhost:1000/signup', formData, {
    //             headers: { 'Content-Type': 'application/json' }
    //         });
    //         setMsg(response.data.message); // Display message
    //         console.log(response.data.message);
    //         navigate('/signin1');
    //     } catch (e) {
    //         console.log('Error Details:', e.response?.data || e.message);
    //         setMsg(e.response?.data.message || 'An error occurred!');
    //     }
    // }
  return (
    <div className='signup'>
        <form onSubmit={handleSubmit}>
            <input type='text' name='username' placeholder='Enter an Username' onChange={handleChange}/>
            <input type='email' name='email' placeholder='Enter an Email' onChange={handleChange}/>
            <input type='password' name='password' placeholder='Enter the password' onChange={handleChange}/>
            <button type="submit"> Sign Up </button>
            <p>{msg}</p>
        </form>
    </div>
  )
}

export default Signup