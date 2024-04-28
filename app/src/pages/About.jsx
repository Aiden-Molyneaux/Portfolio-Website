import headshotImage from '../assets/headshotImage.jpg';

export default function About() {
  const aboutDetails = {
    sectionDescription: 'Welcome to my corner of the web! Here, you\'ll find a glimpse into my journey as a junior software developer and enthusiast of all things digital. But before we dive into the intricacies of code and creativity, let me introduce myself.',
    skillsAndExpertise: 'As a recent graduate with a Bachelor of Computer Science from Carleton University, I\'ve honed my skills in various domains of software development. With a primary focus on web development, I\'ve delved deep into crafting dynamic and user-centric applications. But beyond technical prowess, I bring an inclusive mindset and a deep respect for diversity to every project I undertake. My soft skills, including technical writing, continuous learning, analytical thinking, and a positive attitude, complement my technical abilities, ensuring well-rounded solutions that exceed expectations.',
    funFacts: [
      {
        title: 'Gaming Enthusiast',
        description: 'From the pixelated worlds of retro classics to the immersive landscapes of modern titles, I\'ve always had a deep love for video games and the culture surrounding them. In fact, I\'ve been journeying through the universe of \'Destiny\' for over a decade, forging friendships and memories along the way.'
      },
      {
        title: 'Rubik\'s Cube Wizard',
        description: 'Beyond the screen, I enjoy the challenge of solving Rubik\'s Cubes of varying sizes, showcasing my knack for problem-solving and perseverance.'
      },
      {
        title: 'Cat Person',
        description: 'In addition to my passion for technology, I share a home with my partner of nearly five years and our three adorable feline companions. They bring endless joy and companionship to our lives, and I may just share a picture or two of their antics.'
      },
      {
        title: 'Movie Referencer',
        description: 'When I\'m not coding or immersed in virtual realms, you\'ll likely find me indulging in my love for cinema, with \'Mad Max: Fury Road\' holding a special place in my heart among my favorite films.'
      },
      {
        title: 'Reader and Listener',
        description: 'Whether through the pages of a book or the voice of an audiobook, I find solace and inspiration in the world of literature, continually expanding my horizons with each new story.'
      }
    ]
  }

  return (
    <div className='content'>
      <div className='aboutContent'>
        <p className='sectionHeader'>About Me</p>
        <p className='sectionDescription'>{aboutDetails.sectionDescription}</p>
        <img src={headshotImage} alt='headshotImage' className='headshotImage'/>

        <div className='moreAboutContent'>
          <div className='hobbySection'>
            <h3>Skills and Expertise</h3>
            <div className='mainSectionText'>
              <p>{aboutDetails.skillsAndExpertise}</p>
            </div>
          </div>

          <div className='funFactsSection'>
            <h3>Fun Facts</h3>
            <div className='mainSectionText'>
              { aboutDetails.funFacts.map((funFact, index) => (
              <div key={index}>
                <p className='contributionTitle'>{funFact.title}</p>
                <p className='textAlignLeft'>{funFact.description}</p>
              </div>))
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}