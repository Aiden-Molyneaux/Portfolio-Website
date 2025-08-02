import React from 'react';
import ActionButton from '../components/ActionButton.jsx';
import EducationDetails from '../components/details/EducationDetails.jsx';
import WorkDetails from '../components/details/WorkDetails.jsx';
import useWindowSize from '../utils/useWindowState.js';


export default function Experience() {
  const location = JSON.parse(window.localStorage.getItem('location'));

  let displayedSection = <WorkDetails id='03'/>;
  if (location.path === '/experience/1') {
    displayedSection = <WorkDetails id='01'/>;
  } else if (location.path === '/experience/2') {
    displayedSection = <WorkDetails id='02'/>;
  } else {
    console.log('experience/3');
    displayedSection = <WorkDetails id='03'/>;
  }

  const { width } = useWindowSize();

  return (
    <div className='pageContent'>
      <p className='sectionHeader'>My Experience</p>
      <div className='experienceContent'>
        <div className='educationSection'>
          <h3>Education</h3>
          <div className='experienceOptions'>
            <ActionButton 
              id='01' 
              name='carleton university' 
            />
          </div>
          
          <EducationDetails id='01'/>
        </div>
        
        <div className='workSection'>
          <h3>Work</h3>
          { width <= 450 ? 
            <div className=''>
              <div className='experienceOptions'>
                <ActionButton 
                  id='01' 
                  path='/experience/1' 
              name='Wicket' 
            />
            <ActionButton 
              id='02' 
              path='/experience/2' 
              name='IEM Inc.' 
                />
              </div>
              <div className='experienceOptions'>
                <ActionButton 
                  id='03' 
                  path='/experience/3' 
                  name='Versaterm' 
                />
              </div>
            </div>
          : <div className='experienceOptions'>
              <ActionButton 
                id='01' 
                path='/experience/1' 
                name='Wicket' 
              />
              <ActionButton 
                id='02' 
                path='/experience/2' 
                name='IEM Inc.' 
              />
              <ActionButton  
                id='03' 
                path='/experience/3' 
                name='Versaterm' 
              />
            </div>
          }
          {displayedSection}
        </div>
      </div>
    </div>
  );
}