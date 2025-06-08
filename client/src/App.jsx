import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import GamePage from './pages/GamePage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import GiftsPage from './pages/GiftsPage';
import AccountPage from './pages/AccountPage';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import AppHuntGame from './games/AppHunt';
import Ace_it from './games/Ace_it/Ace_it';
import AceItAnalytics from './games/Ace_it/AceItAnalytics'
import Signup from './pages/Signup';

const AppWrapper = () => {
  const location = useLocation();


  const hideHeaderRoutes = ['/AppHunt', '/spottheplane', "/Ace_it"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path='/' element={<GamePage />} />
        <Route path='/gifts' element={<GiftsPage />} />
        <Route path='/account' element={<AccountPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/AppHunt' element={<AppHuntGame />} />
        <Route path='/Ace_it' element={<Ace_it />} />
        <Route path='/analysis' element={<AceItAnalytics />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading style={{ width: 2000, height: 2000 }} />;

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
