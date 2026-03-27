import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex flex-col justify-center items-center mt-20 mb-20 gap-4">
        <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
        <p className="text-center text-richblack-300 mt-3">We'd love to here for you, Please fill out this form.</p>
        <div className="mt-12 mx-auto sm:w-[500px] w-full p-4 lg:p-0">
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection
