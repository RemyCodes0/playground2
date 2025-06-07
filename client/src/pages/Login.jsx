// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'
// import { API_URL } from "../../constants";

// const Login = () => {
//     const [form, setForm] = useState({email: '', password:''})
//     const handleChange = e=> setForm({...form, [e.target.name]: e.target.value})
//     const handleSubmit = async e=>{
//         e.preventDefault()
//         try{
//         const res = await axios.post(`${API_URL}/api/auth/login`, form);
//         localStorage.setItem('token', res.data.token)
//         alert('successfully logged In')
//         }catch(err){
//             alert(err.response?.data?.message || 'Login failed')
//         }

//     }

//   return (
//     <form onSubmit={handleSubmit}>
//         <input name='email' placeholder='Email' onChange={handleChange}/>
//         <input name='password' type='password' placeholder='Password' onChange={handleChange}/>
//         <button type='submit'>Login</button>
//     </form>
//   )
// }

// export default Login

// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Login = () => {
//   const { loginWithRedirect } = useAuth0();
//   return (
//     <button
//       onClick={() => {
//         loginWithRedirect();
//       }}
//     >
//       Login
//     </button>
//   );
// };

// export default Login;

import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from "../firebase"
import logo from '../assets/logo.svg'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError("")
    setSuccess("")
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      setSuccess(`Welcome back, ${user.displayName || user.email}!`);
      setEmail("")
      setPassword("");

      console.log("User Logged in:", user)
    } catch(err){
      console.error("error logging in:", err.message);
      setError(err.message);
    }
  }
  return (
    <div className='min-h-screen p-10 bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center' style={{marginTop: -70}}>
      <div className='p-6 mx-auto max-w-3xl bg-white rounded-xl flex flex-col items-center justify-center '>
        <div className='mb-10'>
<img src={logo} alt="Logo image" className='rounded' />
        </div>
      

      <form onSubmit={handleSubmit} className='flex flex-col '>
        <label >Email</label>
        <input type="text" name='email' value={email} className='border mb-4 ' onChange={(e)=> setEmail(e.target.value)} required />
        <label >Password</label>
        <input type="password" name="password" className='border mb-10' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        <button className='w-full bg-red-600 mb-4 text-white'  type='submit'>Login</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
      
    </div>
  )
}

export default Login
