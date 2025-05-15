import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [form, setForm] = useState({email: '', password:''})
    const handleChange = e=> setForm({...form, [e.target.name]: e.target.value})
    const handleSubmit = async e=>{
        e.preventDefault()
        try{
        const res = await axios.post('http://localhost:5000/api/auth/login', form);
        localStorage.setItem('token', res.data.token)
        alert('successfully logged In')
        }catch(err){
            alert(err.response?.data?.message || 'Login failed')
        }
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <input name='email' placeholder='Email' onChange={handleChange}/>
        <input name='password' type='password' placeholder='Password' onChange={handleChange}/>
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login