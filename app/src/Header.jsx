/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */

import { useState } from 'react';
import HeaderButton from './HeaderButton';

export default function Header() {

  const [route, setRoute] = useState(location.route);

  const routes = [
    { id: '01', path: '/home', name: 'home' },
    { id: '02', path: '/about', name: 'about' },
    { id: '03', path: '/work', name: 'work' },
    { id: '04', path: '/experience', name: 'experience' },
    { id: '05', path: '/contact', name: 'contact' },
  ];
  
  return (
    <header>
      <h2 className='headerName'>AidenMolyneaux
        <span className='whiteFont'>.</span>
        <span className='redFont'>_</span>
      </h2>
  
      <div className='headerButtons'>
        {routes.map(route => (
          <HeaderButton 
            id={route.id} 
            path={route.path} 
            name={route.name}
            setRoute={setRoute}
          />
        ))}
      </div>
      
    </header>
  );
}