import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase" 
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';

const Signup = () => {
    const [email, setEmail] =useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loader, setLoader] = useState(false) 
    const navigate = useNavigate()



    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("")
        setSuccess("")
        setLoader(true)
        if (password !== confirmPassword){
            setError("passwords do not match")
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            
            await updateProfile(user, {
                displayName: displayName,
            });
            setSuccess("User created successfully!, you can now login");
            setEmail("")
            setDisplayName("")
            setPassword("")
            setConfirmPassword("")
            navigate("/login")
            console.log("User created:", user);
        } catch(err){
            console.error("Error signing up:", err.message);
            setError(err.message);
            setLoader(false)
        }
    };
    const handleGoogleSignup =async ()=>{
        setError("")
        setSuccess("")
        setLoader("")

        const provider = new GoogleAuthProvider()
        try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            setSuccess(`Welcome ${user.displayName}! Account created with Google`)
            navigate("/")
        }catch(err){
            setError(err.message)
        }finally{
            setLoader(false)
        }
    }


  return (
    <div className='min-h-screen p-10 bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center' style={{marginTop: -70}}>
        <div className='p-6 mx-auto max-w-3xl bg-white rounded-xl flex flex-col items-center justify-center '>
           <div className='mb-10'>
           <img src={logo} alt="Logo image" className='rounded' />
            </div>
        <form className='flex flex-col ' onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input  className='border mb-4 w-full' type="text" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} required/>

            </div>
            <div>
                <label >Email</label>
                <input  className='border mb-4 w-full' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

            </div>
            <div>
                     <label >Password</label>
            <input  className='border mb-4 w-full' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div>
                <label >Confirm Password</label>
            <input  className='border mb-9 w-full' type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
            </div>     

            {!loader? 
            (<button className='w-full bg-red-600 mb-4 rounded-sm p-2 text-white'  type='submit'>Signup</button>)
            :(<button className='w-full bg-red-600 mb-4 rounded-sm p-2 text-white'  type='submit'>Loading...</button>)
        }
        <button onClick={handleGoogleSignup} className='w-full bg-blue-500 mb-4 rounded-sm p-2 text-white' type='button'>
            Signup with Google
        </button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>} 
        </div>
       
    </div>
  )
}

export default Signup

