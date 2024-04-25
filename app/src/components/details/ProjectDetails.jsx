import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import cesImg from '../../assets/CES.png';

export default function ProjectDetails({ id }) {
  ProjectDetails.propTypes = {
    id: PropTypes.string.isRequired,
  };

  const projectDetails = [
    {
      title: 'Prototype CES Software',
      languages: ['C++', 'QT'],
      duration: 'November 2022 - December 2022',
      githubLink: 'https://github.com/Aiden-Molyneaux/CESdevice-software',
      objective: 'Final project for my ‘Object-Oriented Software Engineering’ course at Carleton University, this project aimed to develop a mock software prototype for the Oasis Pro Cranial Electrotherapy Stimulation (CES) medical device. Led by myself, the team embarked on a six-week journey to create a safe and functional software emulation, utilizing C++ and the QT framework.',
      keyContributions: [
        {
          title: 'Team Leadership',
          description: 'aking the helm, I guided a team of four through the development process, orchestrating collaboration and ensuring timely progress.'
        },
        {
          title: 'Technical Execution',
          description: 'Immersed in a Linux Virtual Machine, I personally invested approximately 50 hours into coding the back-end functionalities using C++, while seamlessly integrating the QT framework for the UI.'
        },
        {
          title: 'Safety and Validation',
          description: 'With safety as our paramount concern, I meticulously crafted testing scripts and contributed to the development of comprehensive UML diagrams, including use cases, sequence diagrams, and a traceability matrix. These measures ensured thorough validation and adherence to safety standards, crucial for medical device software.'
        }
      ],
      outcomes: [
        'The resulting prototype not only successfully mimicked the functionality of the Oasis Pro CES device but also demonstrated proficiency in applying appropriate design patterns, rigorous testing, and meticulous documentation. While the project did not involve hardware integration, it showcased our ability to deliver robust and secure software solutions in a simulated medical context.',
        'This project exemplifies my capacity for technical leadership, meticulous problem-solving, and commitment to ensuring software safety and quality.'
      ],
      imgSrc: cesImg,
      imgAlt: 'React icon and Ruby icon.'
    },
    {},
    {},
    {
      title: 'Health & Fitness Club Web Application',
      languages: ['React', 'Node.js', 'PostgreSQL'],
      duration: 'March 2024 - Current',
      githubLink: 'https://github.com/Aiden-Molyneaux/3005_ClubProject',
      objective: 'Final project for my ‘Object-Oriented Software Engineering’ course at Carleton University, this project aimed to develop a mock software prototype for the Oasis Pro Cranial Electrotherapy Stimulation (CES) medical device. Led by myself, the team embarked on a six-week journey to create a safe and functional software emulation, utilizing C++ and the QT framework.',
      keyContributions: [
        {
          title: 'Team Leadership',
          description: 'Taking the helm, I guided a team of four through the development process, orchestrating collaboration and ensuring timely progress.'
        },
        {
          title: 'Technical Execution',
          description: 'Immersed in a Linux Virtual Machine, I personally invested approximately 50 hours into coding the back-end functionalities using C++, while seamlessly integrating the QT framework for the UI.'
        },
        {
          title: 'Safety and Validation',
          description: 'With safety as our paramount concern, I meticulously crafted testing scripts and contributed to the development of comprehensive UML diagrams, including use cases, sequence diagrams, and a traceability matrix. These measures ensured thorough validation and adherence to safety standards, crucial for medical device software.'
        }
      ],
      outcomes: [
        'The resulting prototype not only successfully mimicked the functionality of the Oasis Pro CES device but also demonstrated proficiency in applying appropriate design patterns, rigorous testing, and meticulous documentation. While the project did not involve hardware integration, it showcased our ability to deliver robust and secure software solutions in a simulated medical context.',
        'This project exemplifies my capacity for technical leadership, meticulous problem-solving, and commitment to ensuring software safety and quality.'
      ],
      imgSrc: cesImg,
      imgAlt: 'React icon and Ruby icon.'
    }
  ];

  const CESDetails = (details) => {
    const { title, languages, duration, githubLink, objective, keyContributions, outcomes, imgSrc, imgAlt } = details;

    return (
      <>
        <p><span className='underline'>{title}</span></p>
        <p>{languages[0]} // {languages[1]}</p>
        <p>{duration}</p>
        <a href={githubLink} target="_blank" className='githubLink'>
          Available on Github:&nbsp;
          <FontAwesomeIcon icon={faGithub}/>
        </a>
        
        <div className='mainSectionText'>
          <h4 className='bottomMargin textAlignLeft'>Objective</h4>
          <p>&emsp;&emsp;{objective}</p>
        
          <h4 className='bottomMargin textAlignLeft'>Key Contributions</h4>
          { keyContributions.map((contribution, index) => (
            <div key={index}>
              <p className='contributionTitle'>{contribution.title}</p>
              <p className='textAlignLeft'>{contribution.description}</p>
            </div>))
          }

          <h4 className='bottomMargin textAlignLeft'>Outcome</h4>
          <img src={imgSrc} alt={imgAlt} className='projectImg'/>
          <p>&emsp;&emsp;{outcomes[0]}</p>
          <p>&emsp;&emsp;{outcomes[1]}</p>
        </div>
      </>
    )
  }

  const ClubDetails = (details) => {
    const { title, languages, duration, githubLink, objective, keyContributions, outcomes, imgSrc, imgAlt } = details;

    return (
      <>
        <p><span className='underline'>{title}</span></p>
        <p>{languages[0]} // {languages[1]} // {languages[2]}</p>
        <p>{duration}</p>
        <a href={githubLink} target="_blank" className='brandLink'>
          Available on Github:&nbsp;
          <FontAwesomeIcon icon={faGithub}/>
        </a>
        
        <div className='mainSectionText'>
          <h4 className='bottomMargin textAlignLeft'>Objective</h4>
          <p>{objective}</p>
        
          <h4 className='bottomMargin textAlignLeft'>Key Contributions</h4>
          { keyContributions.map((contribution, index) => (
            <div key={index}>
              <p className='contributionTitle'>{contribution.title}</p>
              <p className='textAlignLeft'>{contribution.description}</p>
            </div>))
          }

          <h4 className='bottomMargin textAlignLeft'>Outcome</h4>
          <img src={imgSrc} alt={imgAlt} className='projectImg'/>
          <p>&emsp;&emsp;{outcomes[0]}</p>
          <p>&emsp;&emsp;{outcomes[1]}</p>
        </div>
      </>
    )
  }

  return (
    <>
      { id === '01' && CESDetails(projectDetails[0]) }
      { id === '04' && ClubDetails(projectDetails[3]) }
    </>
  );
}
