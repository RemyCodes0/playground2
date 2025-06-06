import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase" 

const Signup = () => {
    const [email, setEmail] =useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")



    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("")
        setSuccess("")
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
            console.log("User created:", user);
        } catch(err){
            console.error("Error signing up:", err.message);
            setError(err.message);
        }
    };


  return (
    <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} required/>

            </div>
            <div>
                <label >Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

            </div>
            <div>
                     <label >Password:</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            </div>
            <div>
                <label >Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>

                </div>     

            <button type='submit'> Sign Up</button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
    </div>
  )
}

export default Signup

