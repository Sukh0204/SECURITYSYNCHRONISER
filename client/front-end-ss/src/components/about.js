import React from 'react'
import logopic from "../images/drdologo.png"


const About = () =>{
    return(
      <>
        <div className='container emp-profile'>
          <form method="">
            <div className='row'>
              <div className='col-md-4'>
                <img src = {logopic} alt="drdo"/>
              </div>

              <div className='col-md-6'>
              < div className='profile-head'>
                <h5>Defence Research and Development Organisation</h5>
                <h6 ><justify>The Defence Research and Development Organisation (DRDO) is the premier agency under the Department of Defence Research and Development in Ministry of Defence of the Government of India, charged with the military's research and development, headquartered in Delhi, India. It was formed in 1958 by the merger of the Technical Development Establishment and the Directorate of Technical Development and Production of the Indian Ordnance Factories with the Defence Science Organisation. With a network of 52 laboratories, which are engaged in developing defence technologies, covering various fields, like aeronautics, armaments, electronics, land combat engineering, life sciences, materials, missiles, and naval systems, DRDO is India's largest and most diverse research organisation. The organisation includes around 5,000 scientists belonging to the DRDS and about 25,000 other subordinate scientific, technical and supporting personnel.</justify></h6>
              </div>
              </div>
            </div>



          </form>
        </div>
        </>
    )
}

export default About;