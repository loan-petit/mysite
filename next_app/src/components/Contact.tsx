import React from 'react'
import axios from 'axios'

import FormHelper, { FieldsInformation } from '../utils/FormHelper'

export default function Contact() {
  // Hook to force component rerender
  const [, updateState] = React.useState<object>()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const emailRegex = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )

  const fieldsValidator = (name: String, value: any) => {
    switch (name) {
      case 'fullName':
        return !value.length ? 'This field is required' : ''
      case 'email':
        return !emailRegex.test(value) ? 'Enter a valid email address' : ''
      case 'message':
        return !value.length ? 'This field is required' : ''
      default:
        return ''
    }
  }

  const onSubmit = (fieldsInformation: FieldsInformation) =>
    axios.post(process.env.SEND_EMAIL_API_URL, {
      toAddresses: [process.env.RECEIVER_EMAIL],
      html: fieldsInformation.message.value,
      subject: `Message from ${fieldsInformation.fullName.value}`,
      sender: process.env.RECEIVER_EMAIL,
      replyToAddresses: [fieldsInformation.email.value],
    })

  const onSubmitResult = ({ error }: any) => {
    if (error) {
      return 'Oops! Something went wrong. Please try again later or contact me on LinkedIn.'
    }
    return ''
  }

  const [formHelper] = React.useState(
    new FormHelper({
      fields: ['fullName', 'email', 'message'],
      refreshComponent: forceUpdate,
      fieldsValidator: fieldsValidator,
      onSubmit: onSubmit,
      onSubmitResult: onSubmitResult,
    }),
  )

  return (
    <section id="contact" className="relative px-6 py-24 bg-gray-900">
      <div className="container flex flex-col w-full min-w-0 px-4 mx-auto break-words bg-gray-300 rounded-lg shadow-lg lg:w-5/12">
        <div className="flex-auto p-5 lg:p-10">
          <h2>Let's get in touch</h2>

          {/*
            <h5>
              You can{' '}
              <a
                href="https://www.calendar.com/loanpetit/initial-meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                schedule a meeting
              </a>{' '}
              with me.
            </h5>
          */}

          <h5>Complete this form and I will get back to you in 24 hours.</h5>

          {/* Full Name field */}
          <div className="relative w-full mt-8 mb-3">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              style={{ transition: 'all .15s ease' }}
              name="fullName"
              value={formHelper.fieldsInformation.fullName.value}
              onChange={formHelper.handleInputChange.bind(formHelper)}
            />
            <p className="form-error">
              {formHelper.fieldsInformation.fullName.error}
            </p>
          </div>

          {/* Email field */}
          <div className="relative w-full mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              style={{ transition: 'all .15s ease' }}
              name="email"
              value={formHelper.fieldsInformation.email.value}
              onChange={formHelper.handleInputChange.bind(formHelper)}
            />
            <p className="form-error">
              {formHelper.fieldsInformation.email.error}
            </p>
          </div>

          {/* Message field */}
          <div className="relative w-full mb-3">
            <label htmlFor="message">Message</label>
            <textarea
              rows={4}
              cols={80}
              placeholder="Type a message..."
              name="message"
              value={formHelper.fieldsInformation.message.value}
              onChange={formHelper.handleInputChange.bind(formHelper)}
            />
            <p className="py-0 form-error">
              {formHelper.fieldsInformation.message.error}
            </p>
          </div>

          {/* Submit */}
          {formHelper.submitStatus.response ? (
            <p className="py-0 text-center">
              Thank you for your message.
              <br />I will get back to you as soon as possible.
            </p>
          ) : (
            <>
              {formHelper.submitStatus.userFriendlyError.length ? (
                <p className="pt-0 pb-4 text-sm italic text-red-500">
                  {formHelper.submitStatus.userFriendlyError}
                </p>
              ) : null}
              <button
                className="px-6 py-3 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none focus:outline-none"
                onClick={formHelper.handleSubmit.bind(formHelper)}
              >
                Send Message
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
