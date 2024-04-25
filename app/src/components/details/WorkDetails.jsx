import PropTypes from 'prop-types';

export default function WorkDetails({ details }) {
  WorkDetails.propTypes = {
    details: PropTypes.object.isRequired
  };

  const { role, company, location, duration, description, keyContributions, imgSrc, imgAlt } = details;

  return (
    <>
      <img src={imgSrc} alt={imgAlt} className='carletonUniversityImg'/>
      <p><span className='underline'>{role}</span></p>
      <p>{company} // {location}</p>
      <p>{duration}</p>

      <div className='mainSectionText'>
        <p>{description[0]}</p>
      
        <h4 className='bottomMargin textAlignLeft'>Key Contributions</h4>
        { keyContributions.map((contribution, index) => (
          <div key={index}>
            <p className='contributionTitle'>{contribution.title}</p>
            <p className='textAlignLeft'>{contribution.description}</p>
          </div>))
        }

        <p>&emsp;&emsp;{description[1]}</p>
      </div>
    </>
  );
}
