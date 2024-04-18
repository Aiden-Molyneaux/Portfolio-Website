import HeaderButton from './HeaderButton';

export default function Experience() {
  window.localStorage.setItem('location', JSON.stringify({ route: '/experience' }));

  return (
    <div className='content'>
      <p className='sectionHeader'>My Experience</p>
      <div className='aboutContent'>
        <p className='sectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
        </p>
      </div>

      <div className='workOptions'>
        <HeaderButton id='01' path='/' name='prototype CES software'/>
        <HeaderButton id='02' path='/' name='a.i. text-accessibility assessor'/>
        <HeaderButton id='03' path='/' name='web crawler & search engine'/>
        <HeaderButton id='04' path='/' name='health & fitness club web app.'/>
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