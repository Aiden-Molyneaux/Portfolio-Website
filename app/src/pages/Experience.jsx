import React from 'react';
import ActionButton from '../components/ActionButton.jsx';
import EducationDetails from '../components/details/EducationDetails.jsx';
import WorkDetails from '../components/details/WorkDetails.jsx';

export default function Experience() {
  const location = JSON.parse(window.localStorage.getItem('location'));

  let displayedSection = <WorkDetails id='03'/>;
  if (location.path === '/experience/1') {
    displayedSection = <WorkDetails id='01'/>;
  } else if (location.path === '/experience/2') {
    displayedSection = <WorkDetails id='02'/>;
  } else {
    displayedSection = <WorkDetails id='03'/>;
  }

  return (
    <div className='pageContent'>
      <p className='sectionHeader'>My Experience</p>
      <div className='experienceContent'>
        <div className='educationSection'>
          <h3>Education</h3>
          <div className='experienceOptions'>
            <ActionButton 
              id='01' 
              name='bachelor of computer science, carleton university' 
              supportMobile={{name1: 'bachelor of computer science,', name2: 'carleton university'}}
            />
          </div>
          
          <EducationDetails id='01'/>
        </div>
        
        <div className='workSection'>
          <h3>Work</h3>
          <div className='experienceOptions'>
            <ActionButton 
              id='01' 
              path='/experience/1' 
              name='Wicket' 
              supportMobile={{name1: 'junior software developer,', name2: 'wicket'}}
            />
            <ActionButton 
              id='02' 
              path='/experience/2' 
              name='IEM Inc.' 
              supportMobile={{name1: 'electrical apprentice,', name2: 'IEM'}}
            />
            <ActionButton 
              id='03' 
              path='/experience/3' 
              name='Versaterm Public Safety' 
              supportMobile={{name1: '', name2: 'Versaterm'}}
            />
          </div>

          { displayedSection }
        </div>
      </div>
    </div>
  );
}