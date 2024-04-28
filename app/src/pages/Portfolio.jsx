import ActionButton from '../components/ActionButton';
import ProjectDetails from '../components/details/ProjectDetails';

export default function Portfolio() {
  const location = JSON.parse(window.localStorage.getItem('location'));

  return (
    <div className='content'>
      <p className='sectionHeader'>My Portfolio</p>
      <div className='portfolioContent'>
        <p className='sectionDescription'>
        Welcome to my portfolio of projects, where I showcase ideas I have brought to life through code. 
        From collaborative university endeavors to solo experiments, each project 
        is a testament to my commitment to continuous breadthful learning. 
        Join me on this exploration of software development.
        </p>

        <div className='projectSection'>
          <div className='portfolioOptions'>
            <h3 className='bottomMargin'>Projects</h3>
            <div className='projectOptions'>
              <ActionButton id='01' path='/portfolio/1' name='prototype CES software'/>
              <ActionButton id='02' path='/portfolio/2' name='web crawler & search engine'/>
              <ActionButton id='03' path='/portfolio/3' name='a.i. text-accessibility assessor'/>
              <ActionButton id='04' path='/portfolio/4' name='health & fitness club web application'/>
            </div>
          </div>

          <div className='projectDetails'>
            <h3 className='bottomMargin'>Project Details</h3>
            { location.path === '/portfolio/1' && <ProjectDetails id='01'/> }
            { location.path === '/portfolio/2' && <ProjectDetails id='02'/> }
            { location.path === '/portfolio/3' && <ProjectDetails id='03'/> }
            { location.path === '/portfolio/4' && <ProjectDetails id='04'/> }
          </div>
        </div>
      </div>
    </div>
  );
}