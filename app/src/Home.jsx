import heart from './assets/heart.svg';

export default function Home() {
  window.localStorage.setItem('location', JSON.stringify({ route: '/home' }));
  
  return (
    <div className='homeContent letterSpacing'>
      <h1>AIDEN MOLYNEAUX</h1>
      <h2>SOFTWARE PROGRAMMER, FULL-STACK DEVELOPER</h2>
      <img src={heart} alt='heart' className='backgroundIcon'/>
    </div>
  );
}