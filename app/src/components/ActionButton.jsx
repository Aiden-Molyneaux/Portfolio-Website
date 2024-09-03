import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ActionButton({ id, path, name, toggleMenu, supportMobile}) {
  ActionButton.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string,
    name: PropTypes.string.isRequired,
    toggleMenu: PropTypes.func,
    supportMobile: PropTypes.object
  };

  const location = JSON.parse(window.localStorage.getItem('location'));

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isExperiencePage = location && path === '/experience' && (location.path === '/experience/1' || location.path === '/experience/2');
  const isPortfolioPage = location && path === '/portfolio' && ['/portfolio/1', '/portfolio/2', '/portfolio/3', '/portfolio/4', '/portfolio/5', '/portfolio/6'].includes(location.path);

  useEffect(() => {
    const location = JSON.parse(window.localStorage.getItem('location'));

    if (isExperiencePage || isPortfolioPage) {
      setIsClicked(true);
    } else {
      setIsClicked(location && location.path === path);
    }
  }, [location]);

  function handleClick() {
    setLocation();
    toggleMenu && toggleMenu();
  }

  function setLocation() {
    // allow the Experience and Portfolio pages to open on the most recent experience and projects
    if (path === '/experience') { path = '/experience/1'; }
    if (path === '/portfolio') { path = '/portfolio/6'; }
    window.localStorage.setItem('location', JSON.stringify({ path: path }));
  }

  function getClassName(element) {
    if (element === 'h6') {
      if (isHovered || isClicked) return 'addPadding';
      return 'removePadding';
    }

    if (isHovered || isClicked) return 'actionButtonClicked actionButtonText';
    return 'actionButtonText';
  }

  function generatePath() {
    if (path === '/experience') return '/experience/1';
    if (path === '/portfolio') return '/portfolio/6';
    return path;
  } 

  return (
    path
      ? <div key={id} className='actionButton'>  
        <h6 className={getClassName('h6')}>{id}</h6>
        <Link 
          to={generatePath()} 
          onClick={() => handleClick()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>//</span>
          { supportMobile && window.innerWidth <= 450 
            ? <span className={getClassName()}>{supportMobile.name1} <br/> {supportMobile.name2}</span>
            : <span className={getClassName()}>{name}</span> 
          }
        </Link>
      </div>
      : <div key={id} className='actionButton'>
        <h6>{id}</h6>
        <Link>
          <span>//</span>
          { supportMobile && window.innerWidth <= 450 
            ? <span className={'actionButtonClicked actionButtonText'}>{supportMobile.name1} <br/> {supportMobile.name2}</span>
            : <span className={'actionButtonClicked actionButtonText'}>{name}</span> 
          }
        </Link>
      </div>
  );
}