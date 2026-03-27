import React from 'react'
import Navbar from '../components/core/HomePage/Navbar'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import Footer from '../components/core/HomePage/Footer'
import ReviewCarousel from '../components/core/HomePage/ReviewCarousel'

const contactDetails = [
  {
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter bg-richblack-900 text-white w-full">
      <Navbar />
      <div className="h-14"></div>
      
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-20">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-8 lg:p-12 border-richblack-700">
            {contactDetails.map((ele, i) => {
              return (
                <div
                  className="flex flex-col gap-2 p-3 text-sm text-richblack-200"
                  key={i}
                >
                  <div className="flex flex-row items-center gap-3">
                    <h1 className="text-lg font-semibold text-richblack-5">
                      {ele.heading}
                    </h1>
                  </div>
                  <p className="font-medium">{ele.description}</p>
                  <p className="font-semibold">{ele.details}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
              Got a Idea? We've got the skills. Let's team up
            </h1>
            <p className="">
              Tell us more about yourself and what you're got in mind.
            </p>
            <div className="mt-7">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mx-auto mt-10 mb-24 flex w-11/12 max-w-maxContent flex-col justify-between gap-8 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewCarousel />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contact
