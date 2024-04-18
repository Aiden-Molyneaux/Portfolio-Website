/* eslint-disable indent */
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Work from './Work';
import Contact from './Contact';
import Experience from './Experience';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const location = JSON.parse(window.localStorage.getItem('location'));
    if (location) {
      switch(location.route) {
        case '/about':
          navigate('/about');
          break;
        case '/work':
          navigate('/work');
          break;
        case '/experience':
          navigate('/experience');
          break;
        case '/contact':
          navigate('/contact');
          break;
      default:
        navigate('/home');
      }
    } else {
      window.localStorage.setItem('location', JSON.stringify({ route: '/home' }));
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/work" element={<Work/>}></Route>
        <Route path="/experience" element={<Experience/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </> 
  );
}

export default App;
