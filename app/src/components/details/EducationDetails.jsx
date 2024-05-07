import React from 'react';
import PropTypes from 'prop-types';
import { educationData } from './experienceData.js'

export default function EducationDetails({ id }) {
  EducationDetails.propTypes = {
    id: PropTypes.string.isRequired
  };

  const { degree, university, location, graduationDate, description, imgSrc, imgAlt } = educationData[0];

  return (
    <>
      <img src={imgSrc} alt={imgAlt} className='experienceImg'/>
      <div>
        <p><span className='experienceName'>{degree}</span></p>
        <p>{university} | {location}</p>
        <p>Graduation Date: {graduationDate}</p>
      </div>
      <div className='mainSectionText'>
        <h4>Experience</h4>
        {description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </>
  );
}
