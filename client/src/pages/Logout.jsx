// import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

// const Logout = () => {
//     const {logout} = useAuth0();
//   return (
//     <button onClick={()=>{logout({returnTo: window.location.origin})}}>Logout</button>
//   )
// }

// export default Logout


import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Logout = () => {
  const handleLogout= async()=>{
    try{
      await signOut(auth)
      console.log('User logged out')
    }catch(err){
      console.error("error logging out:". err.message)
    }
  }
  return (
    <div>Logout
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout

