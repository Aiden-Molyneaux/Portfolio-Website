import React from 'react';
import headshotImage from '../assets/headshot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faCube, faCat, faFilm, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import catImage1 from '../assets/tubbin.png';
import catImage2 from '../assets/timber.png';
import catImage3 from '../assets/tulip.png';

export default function About() {
  const sectionDescription = 'Welcome to my corner of the web! Here, you\'ll find a glimpse into my journey as a student, junior software developer, and enthusiast of all things digital. But before we dive into the intricacies of code and creativity, let me introduce myself.';
  const skillsAndExpertise = 'As a recent graduate from Carleton University with a Bachelor of Computer Science, I\'ve tested my skills in various domains of software development. With a primary focus on web development, I\'ve crafted dynamic and user-centric applications. Beyond technical prowess, I bring an inclusive mindset and a deep respect for people and their unique needs to every project I undertake. My technical abilities are complimented by my soft skills, which include my positive attitude and aptitude for continuous learning, analytical thinking, and technical writing, ensuring well-rounded solutions that exceed expectations.';
  const funFacts = [
    {
      title: 'Gaming Enthusiast',
      description: 'From the pixelated worlds of retro classics to the immersive landscapes of modern titles, I\'ve always loved video games and the culture surrounding them. My favourite games are from the \'Destiny\' universe, which I have been exploring for over a decade, forging friendships and memories along the way.',
      icon: faHeadset
    },
    {
      title: 'Rubik\'s Cube Wizard',
      description: 'Beyond the screen, I enjoy the challenge of learning new tricks such as juggling and solving Rubik\'s Cubes, showcasing my knack for problem-solving and perseverance.',
      icon: faCube
    },
    {
      title: 'Movie Referencer',
      description: 'When I\'m not coding or immersed in virtual realms, you might find me indulging in my love for cinema, with \'Mad Max: Fury Road\' holding a special place in my heart among my favorite titles.',
      icon: faFilm
    },
    {
      title: 'Reader and Listener',
      description: 'Through the pages of a good book or the voice of an audiobook, I find solace and inspiration in the world of literature, continually expanding my horizons with each new story.',
      icon: faBookOpen
    },
    {
      title: 'Cat Person',
      description: 'In addition to my passion for technology, I share a passion for family with my partner of nearly five years. Together we care for three adorable felines, who bring endless joy and companionship to our lives, and I may just share a picture or two of their antics.',
      icon: faCat
    }
  ]

  const splitFactsIntoSets = (funFacts) => {
    const half = Math.ceil(funFacts.length / 2);
    const firstHalf = funFacts.slice(0, half);
    const secondHalf = funFacts.slice(half, funFacts.length);
  
    const generateSet = (facts) => (
      <div className={facts.length === 2 ? 'mainSectionText secondFactsSet': 'mainSectionText'}>
        { facts.map((funFact, index) => (
          <div key={index}>
            <p className='contributionTitle'>{funFact.title} <FontAwesomeIcon icon={funFact.icon}/></p>
            <p className='textAlignLeft'>{funFact.description}</p>
            { funFact.title === 'Cat Person' &&
            <>
              <div className='catImages'>
                <img src={catImage1} alt='A picture of my cat, Tubbin' className='catImage'/>
                <img src={catImage2} alt='A picture of my cat, Timber' className='catImage'/>
                <img src={catImage3} alt='A picture of my cat, Tulip' className='catImage'/>
              </div>
              <p className='topMargin'>Meet Tubbin, Timber, and Tulip!</p>
            </> 
            }
          </div>))
        }
      </div>
    );
  
    const firstSet = generateSet(firstHalf);
    const secondSet = generateSet(secondHalf);
  
    return { firstSet, secondSet };
  }
  
  const { firstSet, secondSet } = splitFactsIntoSets(funFacts);

  return (
    <div className='pageContent'>
      <div className='aboutContent'>
        <p className='sectionHeader'>About Me</p>
        <p className='sectionDescription'>{sectionDescription}</p>
        <img src={headshotImage} alt='headshotImage' className='headshotImage'/>

        <div className='moreAboutContent'>
          <div className='skillsSection'>
            <h3>Skills and Expertise</h3>
            <div className='mainSectionText'>
              <p>{skillsAndExpertise}</p>
            </div>
          </div>

          <div className='funFactsSection'>
            <h3>Fun Facts</h3>
            <div className='funFactsText'>
              {firstSet}
              {secondSet}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}