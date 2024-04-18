/* eslint-disable react/jsx-no-comment-textnodes */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HeaderButton({ id, path, name, setRoute }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const location = JSON.parse(window.localStorage.getItem('location'));

  useEffect(() => {
    setIsClicked(location.route === path);
  }, [location]);

  function setLocation(route) {
    setRoute(route);
    window.localStorage.setItem('location', JSON.stringify({ route: route }));
  }

  function getClassName() {
    if (isHovered) return 'buttonClicked buttonText';
    if (isClicked) return 'buttonClicked buttonText';
    return 'buttonText';
  }

  return (
    <div key={id}>
      <h6>{id}</h6>
      <Link 
        to={path} 
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
  );
}