import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"

const genders = ["Male", "Female", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    gender: user?.additionalDetails?.gender || "Male",
    contactNumber: user?.additionalDetails?.contactNumber || "",
    about: user?.additionalDetails?.about || "",
  })

  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const submitProfileForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(updateProfile(token, formData))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
    setLoading(false)
    navigate('/dashboard/my-profile')
  }

  return (
    <form onSubmit={submitProfileForm}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 px-4 md:p-8 md:px-12 text-richblack-5">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* Row 1: First Name & Last Name */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="text-richblack-50 label-style">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              className="form-style"
              value={formData.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="text-richblack-50 label-style">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              className="form-style"
              value={formData.lastName}
              onChange={handleOnChange}
            />
          </div>
        </div>

        {/* Row 2: Date of Birth & Gender */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="text-richblack-50 label-style">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-style"
              value={formData.dateOfBirth}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label className="text-richblack-50 label-style">
              Gender <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-wrap items-center gap-y-3 gap-x-4 md:gap-x-6 rounded-lg bg-richblack-700 p-3 text-richblack-5 shadow-[0_1px_0_0] shadow-white/50">
              {genders.map((gen) => (
                <label key={gen} className="flex items-center gap-x-2 cursor-pointer break-words">
                  <input
                    type="radio"
                    name="gender"
                    value={gen}
                    checked={formData.gender === gen}
                    onChange={handleOnChange}
                    className="accent-yellow-50 w-4 h-4 cursor-pointer"
                  />
                  <span>{gen}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Phone Number & About */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="text-richblack-50 label-style">
              Phone Number <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex gap-2">
              <select
                className="form-style w-[80px] pr-2"
                defaultValue="+91"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="12345 67890"
                className="form-style w-full"
                value={formData.contactNumber}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="text-richblack-50 label-style">
              About
            </label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="Enter Bio Details"
              className="form-style"
              value={formData.about}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          type="button"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  )
}
