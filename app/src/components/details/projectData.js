import { faPython, faReact, faNodeJs, faJs } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faObjectUngroup } from '@fortawesome/free-solid-svg-icons';
import cesImg from '../../assets/CES.png';
import searchEngine from '../../assets/searchEngine.png';
import aiAssessorImg1 from '../../assets/aiAssessor1.png';
import aiAssessorImg2 from '../../assets/aiAssessor2.png';
import dontSnoozeImg1 from '../../assets/dontSnoozeImg1.png';
import dontSnoozeImg2 from '../../assets/dontSnoozeImg2.png';
import dontSnoozeImg3 from '../../assets/dontSnoozeImg3.png';

const projectData = [
  {
    title: 'Prototype CES Software',
    languages: [
      { name: 'C++' },
      { name: 'QT', icon: faObjectUngroup }
    ],
    duration: 'November 2022 - December 2022',
    githubLink: 'https://github.com/Aiden-Molyneaux/CESdevice-software',
    objective: 'Term project for my \'Object-Oriented Software Engineering\' course at Carleton University, the objective of this project was to develop a software prototype for the \'Oasis Pro\' Cranial Electrotherapy Stimulation (CES) medical device. Led by myself, the team embarked on a six-week journey to create a functionally safe software emulation, utilizing C++ for programming the back-end and the QT framework to build the GUI.',
    keyContributions: [
      {
        title: 'Team Leadership',
        description: 'Taking the lead on development, I coordinated a team of four through the development and documentation process, organizing collaborative sessions and ensuring timely progress.'
      },
      {
        title: 'Technical Execution',
        description: 'Developing in a Linux Virtual Machine, I collaborated closely with a peer to develop complex back-end functionalities using C++, while seamlessly integrating ou GUI created using the QT framework.'
      },
      {
        title: 'Safety and Validation',
        description: 'With safety as our paramount concern, we methodically documented the project by drafting comprehensive UML diagrams, including use cases, sequence diagrams, and a traceability matrix. We also meticulously crafted testing scripts available to use in the GUI. These measures ensured thorough validation and adherence to safety standards, crucial for medical device software.'
      }
    ],
    outcomes: [
      'The resulting software prototype not only successfully mimicks the functionality of the \'Oasis Pro\' CES device but also demonstrates proficiency in applying appropriate design patterns, rigorous testing, and meticulous documentation. It showcases my ability to deliver robust and secure software solutions in a complex simulated environment.',
      'This project exemplifies my capacity for technical leadership, as well as a commitment to ensuring software safety and quality.'
    ],
    imgData: [{ 
      imgSrc: cesImg, 
      imgAlt: 'Screenshot of my group\'s CES device application interface.' 
    }],
  },
  {
    title: 'Web Crawler and Search Engine',
    languages: [
      { name: 'JavaScript', icon: faJs },
      { name: 'Node', icon: faNodeJs },
      { name: 'MongoDB', icon: faDatabase }
    ],
    duration: 'November 2022 - December 2022',
    githubLink: 'https://github.com/Aiden-Molyneaux/WebCrawler-SearchEngine',
    objective: 'As a culminating project in a 4000-level course, a peer and I were tasked with programming a fundamental search engine that indexes on web-crawled data, requiring us to employ essential concepts and tools covered in the course. Our aim was to implement a web crawler, a RESTful server, and a browser-based client to facilitate user searches.',
    keyContributions: [
      {
        title: 'Web Crawling Expertise',
        description: 'Leveraging the Cheerio library and MongoDB, we developed a web crawler program that gathers page information from 1000 unique pages. Each page\'s data is stored as an individual document in a MongoDB collection, ensuring persistence and efficient data retrieval.'
      },
      {
        title: 'RESTful Server Implementation',
        description: 'Using Node.js and Express, we constructed a robust back-end to interact seamlessly with the MongoDB database. Our server was designed to read data from the database, perform necessary indexing, and deliver relevant, ranked search results for user queries.'
      },
      {
        title: 'User-Friendly Front-End UI',
        description: 'In tandem with the server development, we built a user-friendly interface to allow users to input search keywords and receive relevant site suggestions. This interface facilitated smooth interaction and enhanced the overall user experience.'
      },
      {
        title: 'Integration and Deployment',
        description: 'Following rigorous testing and validation, we successfully deployed our server to OpenStack, ensuring accessibility for the TA to execute search requests. The course culminated with the integration of our server with our professor\'s distributed search service.'
      }
    ],
    outcomes: [
      'Our efforts lead to the creation of a fundamental search engine, showcasing our proficiency in web development, server-side scripting, and deployment methodologies. With our project meeting all submission requirements and achieving high performance in functionality and scalability, it stands as a testament to our capabilities as software developers poised to tackle complex challenges in the field.'
    ],
    imgData: [{ 
      imgSrc: searchEngine, 
      imgAlt: 'Screenshot of my group\'s CES device application interface.' 
    }],
  },
  {
    title: 'A.I. Image-Text Accessibility Assessor',
    languages: [
      { name: 'Python', icon: faPython }
    ],
    duration: 'November 2023 - December 2023',
    githubLink: 'https://github.com/Aiden-Molyneaux/AI-TextAccessibility-Assessor',
    objective: 'In collaboration with a good friend and peer of mine, I undertook a learning opportunity to develop a novelty AI-driven image-text accessibility assessment tool. Over a rigorous three-week period, we invested much time and energy to develop a solution poised to help users meet accessibility standards with their images.',
    keyContributions: [
      {
        title: 'Collaborative Learning',
        description: 'I led significant development processes such as conceptualization and implemention of the AI Image-Text Accessibility Assessor, a project that stood to expand our knowledge and experience in the world of Artificial Intelligence.'
      },
      {
        title: 'Dataset Diversity',
        description: 'We compiled three distinct datasets, a set of real-world photographs, a set of procedurally generated images, and a set consisting of an equal number of images of the other sets. Implementing dataset diversity was essential for training and validating a suite of AI models.'
      },
      {
        title: 'Experimentation and Iteration',
        description: 'Guided by a scientific approach, we experimented with various AI methods and technologies, including Logistic Regression and Tesseract OCR, iterating on our design to optimize accuracy and reliability.'
      },
      {
        title: 'Human-Centric Design',
        description: 'Grounded in making accessibility and inclusivity a priority, we sourced user feedback to refine the Assessor\'s objective, ensuring it not only delivered accurate assessments but also offered actionable suggestions for enhancing accessibility.'
      }
    ],
    outcomes: ['To us, the AI Image-Text Accessibility Assessor represented an opportunity to build something with practical societal value. Beyond its role as a software project, it stands as an experiment in leveraging AI to empower individuals with diverse visual abilities. With its successful completion and commendable performance, this project showcases my dedication to innovation and my ability to navigate complex challenges in software development.'],
    imgData: [      
      { 
        imgSrc: aiAssessorImg1,
        imgAlt: 'Screenshot of my team\'s AI Image-Text Accessibility Assessor GUI.'
      },
      { 
        imgSrc: aiAssessorImg2,
        imgAlt: 'Screenshot of the Assessor\'s rendering of the user\'s image in normal and all colorblind visions.'
      }
    ],
  },
  {
    title: 'Health & Fitness Club Web App',
    languages: [
      { name: 'React', icon: faReact },
      { name: 'Node', icon: faNodeJs },
      { name: 'Postgres', icon: faDatabase }
    ],
    duration: 'March 2024 - Current',
    githubLink: 'https://github.com/Aiden-Molyneaux/3005_ClubProject',
    objective: 'As the culmination of a 3000-level \'Databases\' course, I took on a solo mission to design and implement a comprehensive Health and Fitness Club web application. Over the span of three intense weeks, I dedicated over 60 hours to crafting a robust platform that seamlessly supports the diverse functionalities and user interactions expected in such a user-oriented application.',
    keyContributions: [
      {
        title: 'User-Centric Design',
        description: 'Starting with an in-depth analysis of user requirements, I then went about conceptualizing and developing an intuitive application architecture to cater to the distinct needs of Members, Trainers, and Admins. From user authentication to booking and managing training sessions, every feature was designed with efficiency and user convenience in mind.'
      },
      {
        title: 'Database Design and Implementation',
        description: 'Leveraging my knowledge of database creation and management, I designed a thorough Entity-Relation diagram, which I then translated into a relational database schema. With PostgreSQL as the backbone, I created a database definition scipt to lay the foundation for the application\'s complex data management needs.'
      },
      {
        title: 'Full-Stack Development',
        description: 'Seamlessly integrating React for the dynamic front-end and Node.js for the back-end, I implemented over one thousand lines of CRUD operations using Express to support data interaction and management. With optimization and scalability in mind, I architected a resilient API to power the application\'s rich functionalities.'
      },
      {
        title: 'Iterative UI Refinement',
        description: 'Grounded in user feedback, I iteratively refined the application\'s UI, constructing visually appealing and intuitive interfaces that enhance user engagement and satisfaction. From wireframes to polished dashboards, every design decision was guided by careful consideration of usability.'
      }
    ],
    outcomes: [
      'The resulting Health and Fitness Club web application stands as a testament to my prowess in conceptualizing, designing, and executing feature-rich software solutions. With bonus marks and a grade of 110% on submission, the project not only exceeded expectations but also showcased my commitment to excellence in Full-Stack web development.'
    ],
    imgData: [
      { 
        imgSrc: dontSnoozeImg1,
        imgAlt: 'Screenshot of my Don\'t Snooze Health and Fitness Club Web Application user interface.'
      },
      { 
        imgSrc: dontSnoozeImg2,
        imgAlt: 'Screenshot of my Don\'t Snooze Health and Fitness Club Web Application user interface.'
      },
      { 
        imgSrc: dontSnoozeImg3,
        imgAlt: 'Screenshot of my Don\'t Snooze Health and Fitness Club Web Application user interface.'
      }
    ]
  }
];

export default projectData;