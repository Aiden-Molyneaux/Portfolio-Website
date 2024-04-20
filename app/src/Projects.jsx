import HeaderButton from './ActionButton';

export default function Projects() {
  return (
    <div className='content'>
      <p className='sectionHeader'>My Projects</p>
      <div className='aboutContent'>
        <p className='sectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
        </p>
      </div>

      <div className='experienceOptions'>
        <HeaderButton id='01' path='/' name='prototype CES software'/>
        <HeaderButton id='02' path='/' name='a.i. text-accessibility assessor'/>
        <HeaderButton id='03' path='/' name='web crawler & search engine'/>
        <HeaderButton id='04' path='/' name='health & fitness club web app.'/>
      </div>
      
      <p className='experienceSectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
      </p>
    </div>
  );
}