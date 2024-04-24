import ActionButton from './ActionButton';

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

      <div className='projectOptions'>
        <ActionButton id='01' path='/projects/1' name='prototype CES software'/>
        <ActionButton id='02' path='/projects/2' name='a.i. text-accessibility assessor'/>
        <ActionButton id='03' path='/projects/3' name='web crawler & search engine'/>
        <ActionButton id='04' path='/projects/4' name='health & fitness club web application'/>
      </div>
    </div>
  );
}