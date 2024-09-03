import React from 'react';
import PropTypes from 'prop-types';
import projectData from './projectData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ImageModal from '../ImageModal.jsx';

export default function ProjectDetails({ id }) {
  ProjectDetails.propTypes = {
    id: PropTypes.string.isRequired,
  };

  function Details(details) {
    const { title, languages, duration, githubLink, objective, keyContributions, outcomes, imgData } = details;

    return (
      <>
        <p><span className='experienceName'>{title}</span></p>

        <div className='projectLanguages'>
          { languages.map((language, index) => (
            <p key={index}>
              { language.name }
              { language.icon && <>&nbsp;<FontAwesomeIcon icon={language.icon}/></>}
              { languages.length - 1 !== index && <>&nbsp;|&nbsp;</> }
            </p>)
          )}
        </div>
        <p>{duration}</p>
        <a href={githubLink} target="_blank" className='brandLink underline'>Available on Github <FontAwesomeIcon icon={faGithub}/></a>

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
          <div className='projectImgsContainer'>
            <div className='projectImgs'>
              { imgData.map((img, index) => (
                <div key={index}>
                  <ImageModal imgSrc={img.imgSrc} imgAlt={img.imgAlt}/>
                </div>))
              }
            </div>
            <h6 id='clickImgText'>Click images to expand</h6>
          </div>
          
          { outcomes.map((outcome, index) => (
              <p key={index}>
                {outcome}
              </p>))
            }
        </div>
      </>
    )
  }

  return (
    <>
      { id === '01' && Details(projectData[0]) }
      { id === '02' && Details(projectData[1]) }
      { id === '03' && Details(projectData[2]) }
      { id === '04' && Details(projectData[3]) }
      { id === '05' && Details(projectData[4]) }
      { id === '06' && Details(projectData[5]) }
    </>
  );
}
