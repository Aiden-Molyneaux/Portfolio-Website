import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import TextField from '../components/TextField.jsx';

export default function Contact() {
  const platformLinks = ['https://www.linkedin.com/in/aiden-molyneaux/', 'https://github.com/Aiden-Molyneaux'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    
    fetch('https://formsubmit.co/9dd068642eb64094e99fc86586fb1715', {
      method: 'POST',
      body: new FormData(event.target),
    })
    .then(() => {
      window.localStorage.setItem('formSubmitted', JSON.stringify(true));
      setIsLoading(false);
      setFormSubmitted(true);
    })
    .catch(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className='pageContent'>
      <form onSubmit={handleSubmit} className='contactForm'>
        <h3 className='sectionHeader'>Contact Me</h3>

        <p>Aiden Molyneaux</p>
        <a href='mailto:aidenmolyneaux@hotmail.com' className='experienceName bottomMargin' id='emailLink' >aidenmolyneaux@hotmail.com <FontAwesomeIcon icon={faPaperPlane}/></a>

        { formSubmitted 
        ? <h6 className='bottomMargin topMargin'>Your message has been sent to Aiden!</h6>
        : <>
          <TextField id='01' name='name' type='input' value={formData.name} handleChange={handleChange}/>
          <TextField id='02' name='email' type='input' value={formData.email} handleChange={handleChange}/>
          <TextField id='03' name='message' type='textarea' value={formData.message} handleChange={handleChange}/>
          <button type='submit' disabled={isLoading} className="contactSubmit topMargin">{isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Submit'}</button>
        </> }
        
        <span className='contactLinks'>
          <a href={platformLinks[0]} target="_blank" className='brandLink'><FontAwesomeIcon icon={faLinkedin} className='fa-2x'/></a>
          <a href={platformLinks[1]} target="_blank" className='brandLink'><FontAwesomeIcon icon={faGithub} className='fa-2x'/></a>
        </span>
        
        <p>Located in Ottawa, Ontario.</p>

        <input type="hidden" name="_captcha" value="false"/>
      </form>
    </div>    
  );
}