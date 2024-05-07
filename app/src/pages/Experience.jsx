import React from 'react';
import ActionButton from '../components/ActionButton.jsx';
import EducationDetails from '../components/details/EducationDetails.jsx';
import WorkDetails from '../components/details/WorkDetails.jsx';

export default function Experience() {
  const location = JSON.parse(window.localStorage.getItem('location'));

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
              name='junior software developer, wicket' 
              supportMobile={{name1: 'junior software developer,', name2: 'wicket'}}
            />
          </div>

          { location.path === '/experience/1'
            ? <WorkDetails id='01'/> 
            : <></>
          }
        </div>
      </div>
    </div>
  );
}