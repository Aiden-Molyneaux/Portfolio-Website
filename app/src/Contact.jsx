
export default function Contact() {
  window.localStorage.setItem('location', JSON.stringify({ route: '/contact' }));
  
  return (
    <div className='content'>
      <p className='sectionHeader'>Contact Me</p>
      <div className='contactContent'>
        <p className='contactSectionText'>
        email: aidenmolyneaux@hotmail.com<br/>
        GitHub: aidenmolyneaux<br/>
        LinkedIn: aidenmolyneaux
        </p>
      </div>
      
      <p className='workSectionText'>
        Aliquam id augue ac ex rhoncus faucibus. 
        Nunc id enim id quam eleifend vestibulum vitae ut urna. 
        Curabitur facilisis odio sit amet egestas efficitur. 
        Aliquam erat volutpat. 
      </p>
    </div>
  );
}