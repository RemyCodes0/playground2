import React, { useState } from 'react'

const Start = () => {
    const [start, setStart] = useState(true)

    const handleClick =() =>{
        setStart(false)
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 '>
        <div className='max-w-7xl rounded-lg bg-white'>
            <button onClick={handleClick} className='text-white bg-red-800'>Start</button>
        </div>
    </div>
  )
}

export default Start