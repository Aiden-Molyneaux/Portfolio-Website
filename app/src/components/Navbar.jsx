import React, { useState } from 'react';
import useWindowSize from '../utils/useWindowState.js';
import ActionButton from './ActionButton.jsx';

export default function Navbar() {
  const routes = [
    { id: '01', path: '/home', name: 'home' },
    { id: '02', path: '/about', name: 'about' },
    { id: '03', path: '/experience', name: 'experience' },
    { id: '04', path: '/portfolio', name: 'portfolio' },
    { id: '05', path: '/contact', name: 'contact' },
  ];

  const { width, height } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className='navbar'>
      <div className='navbarContent'>
        {/* <div className='navbarSpacer'/> */}
        <h2 className='navbarName'>
          <span>AidenMolyneaux</span>
          <span className='whiteFont'>.</span>
          <span className='redFont'>_</span>
        </h2>

        { width <= 750 && 
          <div className='mobileMenuButtonContainer'>
            <button onClick={() => toggleMenu()} className='mobileMenuButton'>☰</button>
          </div>
        }
      </div>

      { width <= 750
        ? <div className={`mobileMenu ${isMenuOpen ? 'mobileMenuOpen' : ''}`}>
          <div className='navButtons'>
            { routes.map(route => (
              <ActionButton
                key={route.id}
                id={route.id} 
                path={route.path} 
                name={route.name}
                toggleMenu={toggleMenu}
              />
            ))}
            <button onClick={toggleMenu} className='mobileMenuExitButton'>×</button>
          </div>
        </div>
        : <div className='navButtons'>
          { routes.map(route => (
            <ActionButton
              key={route.id}
              id={route.id} 
              path={route.path} 
              name={route.name}
            />
          ))}
        </div>
      }
    </div>
  );
}