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

  const isExperiencePage = location && path === '/experience' && location.path === '/experience/1';
  const isPortfolioPage = location && path === '/portfolio' && ['/portfolio/1', '/portfolio/2', '/portfolio/3', '/portfolio/4'].includes(location.path);

  useEffect(() => {
    if (isExperiencePage || isPortfolioPage) {
      setIsClicked(true);
    } else {
      setIsClicked(location.path === path);
    }
  }, [location]);

  function setLocation() {
    // allow the Experience and Portfolio pages to open on the most recent experience and projects
    if (path === '/experience') { path = '/experience/1'; }
    if (path === '/portfolio') { path = '/portfolio/4'; }
    window.localStorage.setItem('location', JSON.stringify({ path: path }));
  }

  function getClassName() {
    if (isHovered || isClicked) return 'buttonClicked buttonText';
    return 'buttonText';
  }

  function generatePath() {
    if (path === '/experience') return '/experience/1';
    if (path === '/portfolio') return '/portfolio/4';
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
          { window.innerWidth > 500 
            ? <span className={'buttonClicked buttonText'}>{name}</span> 
            : <span className={'buttonClicked buttonText'}>bachelor of computer science, <br/> carleton university</span> }
        </Link>
      </div>
  );
}