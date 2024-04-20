/* eslint-disable react/jsx-no-comment-textnodes */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ActionButton({ id, path, name }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const location = JSON.parse(window.localStorage.getItem('location'));

  useEffect(() => {
    if (path === '/experience' && (location.path === '/experience/1' || location.path === '/experience/2')) {
      setIsClicked(true);
    } else {
      setIsClicked(location.path === path);
    }
  }, [location]);

  function setLocation(path) {
    if (path === '/experience') { path = '/experience/2'; }
    window.localStorage.setItem('location', JSON.stringify({ path: path }));
  }

  function getClassName() {
    if (isHovered) return 'buttonClicked buttonText';
    if (isClicked) return 'buttonClicked buttonText';
    return 'buttonText';
  }

  return (
    path
      ? <div key={id} className='actionButton'>
        <h6>{id}</h6>
        <Link 
          to={path === '/experience' ? '/experience/2' : path} 
          onClick={() => {
            setLocation(path);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>//</span>
          <span className={getClassName()}>{name}</span>
        </Link>
      </div>
      : <div key={id} className='actionButton'>
        <h6>{id}</h6>
        <Link>
          <span>//</span>
          <span className={'buttonClicked buttonText'}>{name}</span>
        </Link>
      </div>
  );
}