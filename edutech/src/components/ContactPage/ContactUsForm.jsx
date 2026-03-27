import React, { useState } from 'react'
import countrycode from '../../data/countrycode.json'
import { apiConnector } from '../../services/apiConnector'
import { contactusEndpoint } from '../../services/apis'

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    countrycode: '+91',
    phoneNo: '',
    message: ''
  })

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitContactForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          countrycode: formData.countrycode,
          phoneNo: formData.phoneNo,
          message: formData.message,
        }
      )
      console.log("Contact Us API Response: ", response)
      alert("Message sent successfully")
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        countrycode: '+91',
        phoneNo: '',
        message: ''
      })
    } catch (error) {
      console.log("Error:", error.message)
      alert("Something went wrong, please try again.")
    }
    setLoading(false)
  }

  return (
    <form onSubmit={submitContactForm} className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-[14px] text-richblack-5">First Name <sup className="text-pink-200">*</sup></label>
          <input required type="text" name="firstname" id="firstname" placeholder="Enter first name" value={formData.firstname} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none" />
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-[14px] text-richblack-5">Last Name</label>
          <input type="text" name="lastname" id="lastname" placeholder="Enter last name" value={formData.lastname} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></label>
        <input required type="email" name="email" id="email" placeholder="Enter email address" value={formData.email} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="text-[14px] text-richblack-5">Phone Number <sup className="text-pink-200">*</sup></label>
        <div className="flex gap-4">
          <div className="flex w-[85px] flex-col gap-2">
            <select name="countrycode" id="countrycode" value={formData.countrycode} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none">
              {countrycode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[calc(100%-100px)] flex-col gap-2">
            <input required type="number" name="phoneNo" id="phonenumber" placeholder="12345 67890" value={formData.phoneNo} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[14px] text-richblack-5">Message <sup className="text-pink-200">*</sup></label>
        <textarea required name="message" id="message" cols="30" rows="7" placeholder="Enter your message here" value={formData.message} onChange={handleOnChange} className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none" />
      </div>

      <button disabled={loading} type="submit" className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[15px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${loading ? "transition-all duration-200 hover:scale-95 hover:shadow-none" : "hover:scale-95 transition-all duration-200"}`}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
