/* eslint-disable indent */
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';

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
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/experience" element={<Experience/>}></Route>
        <Route path="/experience/1" element={<Experience/>}></Route>
        <Route path="/projects" element={<Projects/>}></Route>
        <Route path="/projects/1" element={<Projects/>}></Route>
        <Route path="/projects/2" element={<Projects/>}></Route>
        <Route path="/projects/3" element={<Projects/>}></Route>
        <Route path="/projects/4" element={<Projects/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </> 
  );
}

export default App;
