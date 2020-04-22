import React from 'react'

import { WaveShapedCanvas } from './common'

/**
 * Services component
 */
const Services = () => {
  return (
    <section id='services-hash' className='relative pb-32 bg-gray-300 lg:pb-56'>
      <WaveShapedCanvas fillStyle='#ffffff' />

      <h1>My services</h1>

      <div className='flex flex-wrap justify-center'>
        {/* Mobile and web applications */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-desktop' />
          </div>
          <h3>Mobile and web applications</h3>
          <p>
            I develop intuitive and impactful websites and applications, with
            Flutter or React, depending on your preferences.
          </p>
        </div>

        {/* DevOps */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-cubes' />
          </div>
          <h3>DevOps</h3>
          <p>
            I automate software delivery and improve systems scalability using
            GitHub Actions and Docker Swarm.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center'>
        {/* Backend */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-cogs' />
          </div>
          <h3>Backend</h3>
          <p>
            I develop stable, secure, and efficient backends using GraphQL,
            Prisma, and Node.js.
          </p>
        </div>

        {/* Chatbot */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-comments' />
          </div>
          <h3>Chatbot</h3>
          <p>
            With Dialogflow, I develop and deploy chatbots on voice assistants
            and messaging platforms.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services
