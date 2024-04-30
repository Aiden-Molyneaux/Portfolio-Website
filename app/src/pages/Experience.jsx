import React from 'react';
import carletonUniversityImg from '../assets/carletonUniversity.jpg';
import reactAndRubyImg from '../assets/reactAndRuby.png';
import ActionButton from '../components/ActionButton.jsx';
import EducationDetails from '../components/details/EducationDetails.jsx';
import WorkDetails from '../components/details/WorkDetails.jsx';

export default function Experience() {
  const location = JSON.parse(window.localStorage.getItem('location'));

  const educationDetails = [
    {
      degree: 'Bachelor of Computer Science',
      university: 'Carleton University',
      location: 'Ottawa, Ontario',
      graduationDate: 'June 2024',
      description: [
        'I began studying the world of Computer Science at Carleton University in 2019. On my journey I became passionate for the field, and developed a keen interest in software development.',
        'My educational experience was enriched by co-operative education opportunities, where I worked tirelessly to mesh my classroom learning with hands-on industry exposure. Through my placements, I had the privilege of connecting with professionals in the field, gaining invaluable insights and forging meaningful relationships within the workplace.',
        'My studies culminated in the completion of my degree in April 2024, with a spring graduation slated for June. Alongside academic excellence, my journey was defined by the cultivation of lasting connections and a passion for what I now call my career.'
      ],
      imgSrc: carletonUniversityImg,
      imgAlt: 'Scenic image of Carleton University in Ottawa, Ontario.'
    }
  ];

  const workDetails = [
    {
      role: 'Junior Software Developer',
      company: 'Wicket',
      location: 'Remote',
      duration: 'May 2021 - November 2023',
      description: [
        'At Wicket, a dynamic tech startup specializing in software-as-a-service, I evolved from a Student Software Developer to a Junior Software Developer over a rewarding tenure of 2.5 years. During this period, I honed my skills in React and Ruby, contributing significantly to both front-end and back-end development.',
        'This role not only solidified my technical foundations in full-stack web development but also enhanced my capabilities in project management and client interaction, preparing me for further challenges in the tech industry.'
      ],
      keyContributions: [
        {
          title: 'Feature Implementation & Bug Resolution',
          description: 'I played a pivotal role in enhancing the web application by implementing new features and resolving bugs, collaborating closely with cross-functional teams to elevate functionality and user experience.'
        },
        {
          title: 'Automated Testing',
          description: 'Developed and maintained over 90 Cypress scripts for comprehensive end-to-end UI testing. These scripts were integrated into the continuous integration pipeline using GitHub Actions, which significantly bolstered our software quality standards.'
        },
        {
          title: 'Data Management Efficiency',
          description: 'Assisted in the development of Python scripts to automate the sanitization of client data, reducing manual workload by approximately 5-10 hours per new client setup.'
        },
        {
          title: 'Performance Optimization',
          description: 'Enhanced the back-end functionality by optimizing Ruby code and implementing paginated database queries, which halved the loading times for multiple resources.'
        },
        {
          title: 'Cloud Configuration',
          description: 'Routinely managed client-requested updates in AWS S3, ensuring timely and precise adjustments to client environments.'
        },
        {
          title: 'Agile Practices Leadership',
          description: 'Actively engaged in and occasionally led Agile ceremonies including stand-ups, planning sessions, reviews, and retrospectives, fostering a collaborative and agile team environment.'
        }
      ],
      imgSrc: reactAndRubyImg,
      imgAlt: 'React icon and Ruby icon.'
    }
  ];

  return (
    <div className='content'>
      <p className='sectionHeader'>My Experience</p>
      <div className='experienceContent'>
        <div className='educationSection'>
          <h3>Education</h3>
          <div className='experienceOptions'>
            <ActionButton id='01' name='bachelor of computer science, carleton university' supportMobile={{name1: 'bachelor of computer science,', name2: 'carleton university'}}/>
          </div>
          
          <EducationDetails details={educationDetails[0]}/>
        </div>
        
        <div className='workSection'>
          <h3>Work</h3>
          <div className='experienceOptions'>
            <ActionButton id='01' path='/experience/1' name='junior software developer, wicket' supportMobile={{name1: 'junior software developer,', name2: 'wicket'}}/>
          </div>

          { location.path === '/experience/1'
            ? <WorkDetails details={workDetails[0]}/> 
            : <></>
          }
        </div>
      </div>
    </div>
  );
}