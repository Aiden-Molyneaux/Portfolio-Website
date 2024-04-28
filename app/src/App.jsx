/* eslint-disable indent */
import './styles/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import backgroundSVG from './assets/backgroundSVG.svg';

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
        <Route path="/portfolio" element={<Portfolio/>}></Route>
        <Route path="/portfolio/1" element={<Portfolio/>}></Route>
        <Route path="/portfolio/2" element={<Portfolio/>}></Route>
        <Route path="/portfolio/3" element={<Portfolio/>}></Route>
        <Route path="/portfolio/4" element={<Portfolio/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
      <img src={backgroundSVG} alt='A black and grey geometric pattern.' className='backgroundSVG'/>
    </> 
  );
}

export default App;
