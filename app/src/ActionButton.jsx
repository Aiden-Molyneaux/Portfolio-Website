import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ActionButton({ id, path, name }) {
  ActionButton.propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  const location = JSON.parse(window.localStorage.getItem('location'));

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isExperiencePage = path === '/experience' && location.path === '/experience/1';
  const isProjectsPage = path === '/projects' && ['/projects/1', '/projects/2', '/projects/3', '/projects/4'].includes(location.path);

  useEffect(() => {
    if (isExperiencePage || isProjectsPage) {
      setIsClicked(true);
    } else {
      setIsClicked(location.path === path);
    }
  }, [location]);

  function setLocation() {
    // allow the Experience and Projects pages to open on the most recent experience and projects
    if (path === '/experience') { path = '/experience/1'; }
    if (path === '/projects') { path = '/projects/4'; }
    window.localStorage.setItem('location', JSON.stringify({ path: path }));
  }

  function getClassName() {
    if (isHovered || isClicked) return 'buttonClicked buttonText';
    return 'buttonText';
  }

  function generatePath() {
    if (path === '/experience') return '/experience/1';
    if (path === '/projects') return '/projects/4';
    return path;
  } 

  return (
    path
      ? <div key={id} className='actionButton'>  
        <h6>{id}</h6>
        <Link 
          to={generatePath()} 
          onClick={() => setLocation()}
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