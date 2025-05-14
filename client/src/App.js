import React, { useEffect, useState } from 'react'
import Loading from './components/Loading'
import GamePage from './pages/GamePage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import GiftsPage from './pages/GiftsPage'
import AccountPage from './pages/AccountPage'
import Header from './components/Header'

const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const timer = setTimeout(()=>{setLoading(false)}, 3000)

    return () => clearTimeout(timer)
  },[])
  if(loading) return <Loading style={{ width: 2000, height: 2000}}/>
  return (
    <div>
    <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<GamePage />}/>
      <Route path='gifts/' element={<GiftsPage />}/>
      <Route path='account/' element={<AccountPage />} />
      <Route path='about/' element={<AboutPage/>} />
    </Routes>
   </Router>
    </div>
  )
}

export default App