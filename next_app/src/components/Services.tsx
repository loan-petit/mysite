import {
  faCogs,
  faComments,
  faCubes,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import WaveShapedCanvas from './shared/WaveShapedCanvas'

export default function Services () {
  return (
    <section
      id='services'
      className='relative pt-20 pb-32 bg-gray-300 lg:pb-56'
    >
      <h1>My services</h1>

      <div className='flex flex-wrap justify-center'>
        {/* Mobile and web applications */}
        <div className='service-card md:w-5/12 lg:w-3/12'>
          <FontAwesomeIcon icon={faDesktop} className='service-icon' />
          <h3>Mobile and web applications</h3>
          <p>
            I develop intuitive and impactful websites and applications, with
            Flutter or React, depending on your preferences.
          </p>
        </div>

        {/* DevOps */}
        <div className='service-card md:w-5/12 lg:w-3/12'>
          <FontAwesomeIcon icon={faCubes} className='service-icon' />
          <h3>DevOps</h3>
          <p>
            I automate software delivery and improve systems scalability using
            GitHub Actions and Docker Swarm.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center'>
        {/* Backend */}
        <div className='service-card md:w-5/12 lg:w-3/12'>
          <FontAwesomeIcon icon={faCogs} className='service-icon' />
          <h3>Backend</h3>
          <p>
            I develop stable, secure, and efficient backends using GraphQL,
            Prisma, and Node.js.
          </p>
        </div>

        {/* Chatbot */}
        <div className='service-card md:w-5/12 lg:w-3/12'>
          <FontAwesomeIcon icon={faComments} className='service-icon' />
          <h3>Chatbot</h3>
          <p>
            With Dialogflow, I develop and deploy chatbots on voice assistants
            and messaging platforms.
          </p>
        </div>
      </div>

      <WaveShapedCanvas fillStyle='#ffffff' />
    </section>
  )
}
