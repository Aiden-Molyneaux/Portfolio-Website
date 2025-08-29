import carletonUniversityImg from '../../assets/carletonUniversity.jpg';
import reactAndRubyImg from '../../assets/wicket_img.jpg';
import iemImg from '../../assets/IEM2.png';
import vpsImg from '../../assets/vps_img.jpg';

const educationData = [
  {
    degree: 'Bachelor of Computer Science',
    university: 'Carleton University',
    location: 'Ottawa, Ontario',
    graduationDate: 'June 2024',
    description: [
      'I began studying the world of Computer Science at Carleton University in 2019. On my journey I became passionate for the field, and developed a keen interest in software development.',
      'My educational experience was enriched by co-operative work opportunities, where I laboured tirelessly to mesh my classroom learning with hands-on industry experience. Through my placements, I had the privilege of connecting with professionals in the field, gaining invaluable insights and forging meaningful relationships within the workplace.',
      'My studies culminated in the completion of my degree in April 2024, with a spring graduation slated for June. Alongside academic excellence, my journey was defined by the cultivation of lasting connections and a passion for what I now call my career.'
    ],
    imgSrc: carletonUniversityImg,
    imgAlt: 'Scenic image of Carleton University in Ottawa, Ontario.'
  }
];

const workData = {
  '01': {
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
  },
  '02': {
    role: 'Industrial Electrical Apprentice (Temp)',
    company: 'Industrial Electrical & Mechanical Inc.',
    location: 'Ottawa, ON',
    duration: 'May 2024 - March 2025',
    description: [
      'As an Industrial Electrical Apprentice at Industrial Electrical & Mechanical Inc., I took on a hands-on role in the installation and maintenance of electrical systems within industrial settings. While actively seeking a career in software development, this position allowed me to gain practical experience in a different yet highly technical field, reinforcing my adaptability and problem-solving skills.',
      'During this period, I supported my team in the field, working in quarries and wash plants around Ottawa. This role required quick thinking and the ability to learn on the job, applying engineering principles in real-time while assisting skilled industrial electricians.'
    ],
    keyContributions: [
      {
        title: 'Hands-on Technical Assistance',
        description: 'I provided essential support in the installation and maintenance of complex industrial electrical systems. My responsibilities included fetching tools, cutting wire, and performing basic electrical tasks such as splicing, all of which contributed to the efficient operation of our projects.'
      },
      {
        title: 'Real-Time Problem Solving',
        description: 'Working closely with experienced electricians, I adapted to rapidly changing tasks, showcasing my ability to troubleshoot and resolve issues in high-pressure environments.'
      },
      {
        title: 'Practical Engineering Application',
        description: 'Although this role was a departure from my primary focus in software development, it allowed me to deepen my understanding of technical problem-solving and system assembly in an industrial context. I was able to observe and participate in the practical application of engineering principles, which further broadened my technical perspective.'
      }
    ],
    imgSrc: iemImg,
    imgAlt: 'Industrial Electrical & Mechanicals logo.'
  },
  '03': {
    role: 'Software Application Support Specialist',
    company: 'Versaterm Public Safety',
    location: 'Ottawa, ON',
    duration: 'April 2025 - Present',
    description: [
      'At Versaterm Public Safety, I work on the front lines of technical support, helping ensure that first responders can depend on the tools they need in critical moments. Supporting a suite of applications—CAD, MDT, vMobile, and VMC—I troubleshoot and resolve issues across multiple languages and platforms, from Genero4GL and C# to ReactJS.',
      'In this fast-paced, high-stakes environment, I triage incoming tickets, reproduce complex client workflows, and work closely with developers, project teams, and end-users to deliver timely, accurate solutions. Contributing to software that supports emergency services has given my work real weight. I’ve felt welcomed into a collaborative, mission-driven environment where I’m proud of what we build and the role I play in making it stronger.'
    ],
    keyContributions: [
      {
        title: 'Cross-Platform Troubleshooting',
        description: 'Support and diagnose issues across a suite of public safety products developed in Genero4GL, C#, and ReactJS, requiring context-switching between multiple languages, architectures, and integrations.'
      },
      {
        title: 'Client Relationship & Communication',
        description: 'Support clients, including frontline officers and technical personnel, through phone and email, offering timely, empathetic assistance. I take responsibility for each case from start to finish, keeping communication open and solutions on track.'
      },
      {
        title: 'Defect Evaluation & Escalation',
        description: 'Assess unexpected system behavior and determine whether issues stem from user error, configuration, or underlying bugs. When necessary, compile detailed, reproducible cases and escalate them as formal development defects.'
      },
      {
        title: 'Source-Level Investigation',
        description: 'Use GitLab, TortoiseGit, and Git Blame to investigate regressions, confirm deployment changes, and trace historical behavior across versions and environments.'
      },
      {
        title: 'Documentation & Internal Knowledge Sharing',
        description: 'Author internal documentation that clarifies nuanced behaviors, new findings, and cross-product interactions—helping raise the technical baseline across the team and support a consistent client experience.'
      }
    ],
    imgSrc: vpsImg,
    imgAlt: 'Versaterm Public Safety logo.'
  },
};

export { educationData, workData };