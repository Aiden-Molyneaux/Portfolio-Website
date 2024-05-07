/* eslint-disable indent */
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles/app.scss';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Experience from './pages/Experience.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const location = JSON.parse(window.localStorage.getItem('location'));
    if (location) {
      navigate(location.path);
    } else {
      window.localStorage.setItem('location', JSON.stringify({ path: '/home' }));
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/experience" element={<Experience/>}></Route>
        <Route path="/experience/1" element={<Experience/>}></Route>
        <Route path="/portfolio" element={<Portfolio/>}></Route>
        <Route path="/portfolio/1" element={<Portfolio/>}></Route>
        <Route path="/portfolio/2" element={<Portfolio/>}></Route>
        <Route path="/portfolio/3" element={<Portfolio/>}></Route>
        <Route path="/portfolio/4" element={<Portfolio/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </> 
  );
}

export default App;
