import React, { useState } from 'react';
import useWindowSize from '../utils/useWindowState.js';
import ActionButton from './ActionButton.jsx';

export default function Header() {
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
    <header>
      <div className={'headerClass headerBackground'}>
        <div className='headerSpacer'/>
        <h2 className='headerName'>
          <span>AidenMolyneaux</span>
          <span className='whiteFont'>.</span>
          <span className='redFont'>_</span>
        </h2>

        { width <= 750 && 
          <div className='hamburgerContainer'>
            <button onClick={() => toggleMenu()} className='hamburgerButton'>☰</button>
          </div>
        }
      </div>

      { width <= 750
        ? <div className={`mobileMenu ${isMenuOpen ? 'menuOpen' : ''}`}>
          <div className='headerButtons'>
            { routes.map(route => (
              <ActionButton
                key={route.id}
                id={route.id} 
                path={route.path} 
                name={route.name}
                toggleMenu={toggleMenu}
              />
            ))}
            <button onClick={toggleMenu} className='exitButton'>×</button>
          </div>
        </div>
        : <div className='headerButtons'>
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
    </header>
  );
}