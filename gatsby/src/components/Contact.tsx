import React from 'react'
import axios from 'axios'

/**
 * Contact component
 */
const Contact = () => {
  const [formFields, setFormFields] = React.useState({
    fullName: { value: '', error: '' },
    email: { value: '', error: '' },
    message: { value: '', error: '' }
  })
  const [sendingError, setSendingError] = React.useState('')
  const [isMessageSend, setIsMessageSend] = React.useState(false)

  // Hook to force component rerender
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  const validateField = (name, { value }) => {
    let error = ''

    switch (name) {
      case 'fullName':
        error = !value.length ? 'This field is required' : ''
        break
      case 'email':
        error = !emailRegex.test(value) ? 'Enter a valid email address' : ''
        break
      case 'message':
        error = !value.length ? 'This field is required' : ''
        break
    }

    return error
  }

  const validateForm = () => {
    let updatedFields = formFields
    let isValid = true

    Object.entries(formFields).forEach(([key, value]) => {
      let error = validateField(key, value)
      updatedFields[key].error = error
      if (error.length) isValid = false
    })

    if (!isValid) {
      setFormFields(updatedFields)
      forceUpdate()
    }
    return isValid
  }

  const handleInputChange = event => {
    const name = event.target.name
    const value = event.target.value
    const error = validateField(name, { value: value })

    setFormFields({
      ...formFields,
      [name]: { error: error, value: value }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (validateForm()) {
      axios
        .post(process.env.SEND_EMAIL_API_URL, {
          toAddresses: [process.env.RECEIVER_EMAIL],
          html: formFields.message.value,
          subject: `Message from ${formFields.fullName.value}`,
          sender: process.env.RECEIVER_EMAIL,
          replyToAddresses: [formFields.email.value]
        })
        .then(_ => {
          setIsMessageSend(true)
        })
        .catch(_ => {
          setSendingError(
            'Oops! Something went wrong. Please try again later or contact me on LinkedIn.'
          )
        })
    }
  }

  return (
    <section id='contact-hash' className='relative px-6 py-24 bg-gray-900'>
      <div className='container flex flex-col w-full min-w-0 px-4 mx-auto break-words bg-gray-300 rounded-lg shadow-lg lg:w-5/12'>
        <div className='flex-auto p-5 lg:p-10'>
          <h2>Let's get in touch</h2>

          <h5>
            You can{' '}
            <a
              href='https://www.calendar.com/loanpetit/initial-meeting'
              target='_blank'
              rel='noopener noreferrer'
            >
              schedule a meeting
            </a>{' '}
            with me.
          </h5>

          <h5>
            Otherwise, complete this form and I will get back to you in 24
            hours.
          </h5>

          {/* Full Name field */}
          <div className='relative w-full mt-8 mb-3'>
            <label htmlFor='full-name'>Full Name</label>
            <input
              type='text'
              placeholder='Full Name'
              style={{ transition: 'all .15s ease' }}
              name='fullName'
              value={formFields.fullName.value}
              onChange={handleInputChange}
            />
            <p className='form-error'>{formFields.fullName.error}</p>
          </div>

          {/* Email field */}
          <div className='relative w-full mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Email'
              style={{ transition: 'all .15s ease' }}
              name='email'
              value={formFields.email.value}
              onChange={handleInputChange}
            />
            <p className='form-error'>{formFields.email.error}</p>
          </div>

          {/* Message field */}
          <div className='relative w-full mb-3'>
            <label htmlFor='message'>Message</label>
            <textarea
              rows={4}
              cols={80}
              placeholder='Type a message...'
              name='message'
              value={formFields.message.value}
              onChange={handleInputChange}
            />
            <p className='py-0 form-error'>{formFields.message.error}</p>
          </div>

          {/* Submit */}
          {!isMessageSend ? (
            <div className='mt-6 text-center'>
              {sendingError.length ? (
                <p className='pt-0 pb-4 text-sm italic text-red-500'>
                  {sendingError}
                </p>
              ) : null}
              <button
                className='px-6 py-3 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none focus:outline-none'
                type='button'
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          ) : (
            <p className='py-0 text-center'>
              Thank you for your message.
              <br />I will get back to you as soon as possible.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
