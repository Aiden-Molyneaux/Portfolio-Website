export default function WorkDetails({ details }) {
  return (
    <>
      <img src={details.imgSrc} alt={details.imgAlt} className='carletonUniversityImg'/>
      <div className='sectionText'>
        <p><span className='underline'>{details.role}</span></p>
        <p>{details.company} // {details.location}</p>
        <p>{details.duration}</p>

        <div className='mainSectionText'>
          <p>{details.description[0]}</p>
        
          <h4 className='bottomMargin textAlignLeft'>Key Contributions</h4>
          { details.keyContributions.map((contribution, index) => (
            <div key={index}>
              <p className='contributionTitle'>{contribution.title}</p>
              <p className='textAlignLeft'>{contribution.description}</p>
            </div>))
          }

          <p>{details.description[1]}</p>
        </div>
      </div>
    </>
  );
}
