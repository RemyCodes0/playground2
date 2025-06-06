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

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Login
    </button>
  );
};

export default Login;
