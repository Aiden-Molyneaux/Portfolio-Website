import { faReact, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import cesImg from '../../assets/CES.png';
import dontSnoozeImg1 from '../../assets/dontSnoozeImg1.png';
import dontSnoozeImg2 from '../../assets/dontSnoozeImg2.png';
import dontSnoozeImg3 from '../../assets/dontSnoozeImg3.png';

const projectDetails = [
  {
    title: 'Prototype CES Software',
    languages: [
      { name: 'C++'},
      { name: 'QT'}
    ],
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
    imgData: [{ 
      imgSrc: cesImg, 
      imgAlt: 'Screenshot of my group\'s CES device application interface.' 
    }],
  },
  {},
  {},
  {
    title: 'Health & Fitness Club Web Application',
    languages: [
      { name: 'React', icon: faReact },
      { name: 'Node', icon: faNodeJs },
      { name: 'Postgres', icon: faDatabase }
    ],
    duration: 'March 2024 - Current',
    githubLink: 'https://github.com/Aiden-Molyneaux/3005_ClubProject',
    objective: 'As the culmination of a 3000-level \'Databases\' course, I embarked on a solo mission to design and implement a comprehensive web application tailored for a Health and Fitness Club. Over the span of three intense weeks, I dedicated over 60 hours to crafting a robust platform that seamlessly supports the diverse functionalities and user interactions expected in such a setting.',
    keyContributions: [
      {
        title: 'User-Centric Design',
        description: 'Starting with an in-depth analysis of user requirements, I meticulously crafted an intuitive application architecture to cater to the distinct needs of Members, Trainers, and Admins. From user authentication to session management and equipment maintenance, every feature was designed with user convenience and efficiency in mind.'
      },
      {
        title: 'Database Design and Implementation',
        description: 'Leveraging my expertise in database management, I meticulously designed a comprehensive Entity-Relation diagram, translating it into a meticulously crafted relational database schema. With PostgreSQL as the backbone, I meticulously scripted a DDL to lay the foundation for the application\'s robust data management capabilities.'
      },
      {
        title: 'Full-Stack Development',
        description: 'Seamlessly integrating React for the dynamic front-end and Node.js for the resilient backend, I orchestrated the development of over a thousand lines of CRUD operations to ensure seamless data interaction and management. With a keen eye for optimization and scalability, I architected a resilient API to power the application\'s rich functionalities.'
      },
      {
        title: 'Iterative UI Refinement',
        description: 'Grounded in user feedback, I iteratively refined the application\'s UI, crafting visually appealing and intuitive interfaces that enhance user engagement and satisfaction. From wireframes to polished dashboards, every design decision was guided by a relentless pursuit of excellence.'
      }
    ],
    outcomes: [
      'The resulting Health and Fitness Club web application stands as a testament to my prowess in conceptualizing, designing, and executing feature-rich software solutions. With bonus marks and a grade of 110% on submission, the project not only exceeded expectations but also showcased my commitment to excellence and innovation in Full-Stack web development.'
    ],
    imgData: [
      { 
        imgSrc: dontSnoozeImg1,
        imgAlt: 'Screenshot of Don\'t Snooze Health and Fitness Club Web Application.'
      },
      { 
        imgSrc: dontSnoozeImg2,
        imgAlt: 'Screenshot of Don\'t Snooze Health and Fitness Club Web Application.'
      },
      { 
        imgSrc: dontSnoozeImg3,
        imgAlt: 'Screenshot of Don\'t Snooze Health and Fitness Club Web Application.'
      }
    ]
  }
];

export default projectDetails;