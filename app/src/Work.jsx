import HeaderButton from './HeaderButton';

export default function Work() {
  window.localStorage.setItem('location', JSON.stringify({ route: '/work' }));
  
  return (
    <div className='content'>
      <p className='sectionHeader'>My Work</p>
      <div className='aboutContent'>
        <p className='sectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
        </p>
      </div>

      <div className='workOptions'>
        <HeaderButton id='01' path='/' name='wendys - crew member'/>
        <HeaderButton id='02' path='/' name='wicket - junior full-stack developer'/>
      </div>
      
      <p className='workSectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
      </p>
    </div>
  );
}