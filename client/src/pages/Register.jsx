import React, { useState } from 'react';
import axios from 'axios'
import { API_URL } from '../../constants';

const Register = () => {
    const [form, setForm] = useState({username: '', email: '', password: ''})
    const handleChange= e=> setForm({...form, [e.target.name]: e.target.value})
    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const res = await axios.post(API_URL + '/auth/register', form);
            localStorage.setItem('token' ,res.data.token)
            alert('registered successfully')
        }catch(err){
            alert(err.response?.data?.message||"something went wrong")
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input name='username' placeholder='Username' onChange={handleChange} required/>
        <input name='email' placeholder='Email' onChange={handleChange} required/>
        <input name='password' type='password' placeholder='Password' onChange={handleChange} required/>
        <button type='submit'>Register</button>
    </form>
  )
}

export default Register
