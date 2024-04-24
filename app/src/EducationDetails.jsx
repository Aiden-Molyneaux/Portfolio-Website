import PropTypes from 'prop-types';

export default function EducationDetails({ details }) {
  EducationDetails.propTypes = {
    details: PropTypes.object.isRequired
  };

  const { degree, university, location, graduationDate, description, imgSrc, imgAlt } = details;

  return (
    <>
      <img src={imgSrc} alt={imgAlt} className='carletonUniversityImg'/>
      <div className='sectionText'>
        <div>
          <p><span className='underline'>{degree}</span></p>
          <p>{university} // {location}</p>
          <p>Graduation Date: {graduationDate}</p>
        </div>
        <div className='mainSectionText'>
          {description.map((paragraph, index) => <p key={index}>&emsp;&emsp;{paragraph}</p>)}
        </div>
      </div>
    </>
  );
}
