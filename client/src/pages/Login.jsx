import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from "../firebase"
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoader(true)
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      setSuccess(`Welcome back, ${user.displayName || user.email}!`);
      setEmail("")
      setPassword("");
      navigate("/")

      console.log("User Logged in:", user)
    } catch(err){
      console.error("error logging in:", err.message);
      setError(err.message);
      setLoader(false)
    }
  }
  const handleGoogleSignup= async ()=>{
    setError("")
    setSuccess("")
    setLoader(true)
    const provider = new GoogleAuthProvider()
    try{
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      setSuccess(`Welcome ${user}`)
      navigate("/")

    }catch(err){
      setError(err.message)
    }finally{
      setLoader(false)
    }
  }
  return (
    <div className='min-h-screen p-10 bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center' style={{marginTop: -70}}>
      <div className='max-w-7xl p-6 mx-auto bg-white rounded-xl flex flex-col items-center justify-center '>
        <div className='mb-10'>
            <img src={logo} alt="Logo image" className='rounded' />
        </div>
      <form onSubmit={handleSubmit} className='flex flex-col '>
        <label >Email</label>
        <input type="text" name='email' value={email} className='border mb-4 w-full' onChange={(e)=> setEmail(e.target.value)} required />
        <label >Password</label>
        <input type="password" name="password" className='border mb-10 w-full' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
      {!loader?(  <button className='w-full bg-red-600 mb-4 text-white rounded-sm p-2'  type='submit'>Login</button>)
      :(  <button className='w-full bg-red-600 mb-4 text-white rounded-sm p-2'  type='submit'>Loading...</button>)}
      <button onClick={handleGoogleSignup} className='w-full bg-blue-500 mb-4 rounded-sm p-2 text-white' type='button'>
            Login with Google
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
      
    </div>
  )
}

export default Login
