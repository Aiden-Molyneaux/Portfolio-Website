import headshotImage from '../assets/headshotImage.jpg';

export default function About() {
  return (
    <div className='content'>
      <p className='sectionHeader'>About Me</p>
      <div className='aboutContent'>
        <p className='sectionDescription'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nulla arcu est, lacinia vitae ex nec, auctor maximus nisl. 
        Vestibulum cursus nisl et odio convallis, vel scelerisque tortor suscipit. 
        Sed vitae maximus est. 
        Proin sit amet ipsum varius, viverra neque in, consectetur ipsum. 
        Sed fermentum feugiat lacus in egestas.
        </p>
        <img src={headshotImage} alt='headshotImage' className='headshotImage'/>

        <div className='moreAboutContent'>
          <div className='hobbySection'>
            <h3>Skills and Expertise</h3>
            <p className='moreSectionText'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla arcu est, lacinia vitae ex nec, auctor maximus nisl. 
            Vestibulum cursus nisl et odio convallis, vel scelerisque tortor suscipit. 
            Sed vitae maximus est. 
            Proin sit amet ipsum varius, viverra neque in, consectetur ipsum. 
            Sed fermentum feugiat lacus in egestas.
            </p>
          </div>
          <div className='funFactsSection'>
            <h3>Fun Facts</h3>
            <p className='moreSectionText'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nulla arcu est, lacinia vitae ex nec, auctor maximus nisl. 
            Vestibulum cursus nisl et odio convallis, vel scelerisque tortor suscipit. 
            Sed vitae maximus est. 
            Proin sit amet ipsum varius, viverra neque in, consectetur ipsum. 
            Sed fermentum feugiat lacus in egestas.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}