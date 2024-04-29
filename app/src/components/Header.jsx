import ActionButton from './ActionButton.jsx';

export default function Header() {
  const routes = [
    { id: '01', path: '/home', name: 'home' },
    { id: '02', path: '/about', name: 'about' },
    { id: '03', path: '/experience', name: 'experience' },
    { id: '04', path: '/portfolio', name: 'portfolio' },
    { id: '05', path: '/contact', name: 'contact' },
  ];
  
  return (
    <header>
      <h2 className='headerName'>
        <span>AidenMolyneaux</span>
        <span className='whiteFont'>.</span>
        <span className='redFont'>_</span>
      </h2>
  
      <div className='headerButtons'>
        {routes.map(route => (
          <ActionButton
            key={route.id}
            id={route.id} 
            path={route.path} 
            name={route.name}
          />
        ))}
      </div>
    </header>
  );
}