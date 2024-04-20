import carletonUniversityImg from './assets/carletonUniversity.jpg';
import ActionButton from './ActionButton';

export default function Experience() {  
  return (
    <div className='content'>
      <p className='sectionHeader'>My Experience</p>
      <div className='experienceContent'>
        <div className='educationSection'>
          <h3>Education</h3>
          <div className='experienceOptions'>
            <ActionButton id='01' name='bachelor of computer science, carleton university'/>
          </div>
          <img src={carletonUniversityImg} alt='carletonUniversityImg' className='carletonUniversityImg'/>
          <p className='sectionText'>
            Aliquam id augue ac ex rhoncus faucibus. 
            Nunc id enim id quam eleifend vestibulum vitae ut urna. 
            Curabitur facilisis odio sit amet egestas efficitur. 
            Aliquam erat volutpat.
          </p>
        </div>

        <div className='workSection'>
          <h3>Work</h3>
          <div className='experienceOptions'>
            <ActionButton id='01' path='/experience/1' name='crew member, wendys'/>
            <ActionButton id='02' path='/experience/2' name='junior full-stack developer, wicket'/>
          </div>
      
          <p className='experienceSectionText'>
            Aliquam id augue ac ex rhoncus faucibus. 
            Nunc id enim id quam eleifend vestibulum vitae ut urna. 
            Curabitur facilisis odio sit amet egestas efficitur. 
            Aliquam erat volutpat. 
          </p>
        </div>
      </div>
    </div>
  );
}