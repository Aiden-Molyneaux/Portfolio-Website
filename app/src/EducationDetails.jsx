import ActionButton from './ActionButton';

export default function EducationDetails({ details }) {
  return (
    <div className='educationSection'>
      <h3>Education</h3>
      <div className='experienceOptions'>
        <ActionButton id={details.id} name={`${details.buttonName}`}/>
      </div>
      <img src={details.imgSrc} alt={details.imgAlt} className='carletonUniversityImg'/>
      <div className='sectionText'>
        <div>
          <p><span className='underline'>{details.degree}</span></p>
          <p>{details.university} // {details.location}</p>
          <p>Graduation Date: {details.graduationDate}</p>
        </div>
        <div className='mainSectionText'>
          {details.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  );
}
