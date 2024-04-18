import profilePicture from './assets/pfp.jpg';

export default function About() {
  window.localStorage.setItem('location', JSON.stringify({ route: '/about' }));
  
  return (
    <div className='content'>
      <p className='sectionHeader'>About Me</p>
      <div className='aboutContent'>
        <p className='sectionText'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nulla arcu est, lacinia vitae ex nec, auctor maximus nisl. 
        Vestibulum cursus nisl et odio convallis, vel scelerisque tortor suscipit. 
        Sed vitae maximus est. 
        Proin sit amet ipsum varius, viverra neque in, consectetur ipsum. 
        Sed fermentum feugiat lacus in egestas.
        </p>
        <img src={profilePicture} alt='pfp' className='pfp'/>

        <div className='moreAboutContent'>
          <div className='hobbySection'>
            <h3>Hobbies</h3>
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