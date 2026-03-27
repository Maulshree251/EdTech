import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/core/HomePage/Navbar';
import signupImg from '../assets/Images/signup.webp';
import frameImg from '../assets/Images/frame.png';
import { sendOTP } from '../services/operations/authAPI';

const SignupPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('Student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phoneNo: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Store signup data in localStorage for the verify-email page
    const signupData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      accountType: accountType,
      contactNumber: `${formData.countryCode}${formData.phoneNo}`,
    };
    localStorage.setItem('signupData', JSON.stringify(signupData));

    setLoading(true);
    await sendOTP(formData.email, navigate);
    setLoading(false);
  };

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 w-11/12 max-w-maxContent mx-auto py-12 gap-12 justify-between items-center">
        {/* Left - Form */}
        <div className="w-full lg:w-[50%] max-w-[500px]">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] mt-4">
            <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>
            <br />
            <span className="font-edu-sa text-blue-100 italic">
              Education to future-proof your career.
            </span>
          </p>

          {/* Account Type Tabs */}
          <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max border-b border-richblack-700">
            {['Student', 'Instructor'].map((type) => (
              <button
                key={type}
                onClick={() => setAccountType(type)}
                className={`py-2 px-5 rounded-full transition-all duration-200 cursor-pointer
                  ${accountType === type
                    ? 'bg-richblack-900 text-richblack-5'
                    : 'bg-transparent text-richblack-200'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4 mt-6">
            {/* First + Last Name */}
            <div className="flex gap-x-4">
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  First Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  placeholder="Enter first name"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none"
                />
              </label>
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Last Name <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  placeholder="Enter last name"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none"
                />
              </label>
            </div>

            {/* Email */}
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none"
              />
            </label>

            {/* Phone Number */}
            <label className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Phone Number <sup className="text-pink-200">*</sup>
              </p>
              <div className="flex gap-x-3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleOnChange}
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[80px] p-[12px] border-b border-richblack-700 outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+81">+81</option>
                </select>
                <input
                  required
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleOnChange}
                  placeholder="12345 67890"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none"
                />
              </div>
            </label>

            {/* Password + Confirm Password */}
            <div className="flex gap-x-4">
              <label className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Create Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none pr-10"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AFB2BF" strokeWidth="2">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </span>
              </label>
              <label className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Confirm Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none pr-10"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AFB2BF" strokeWidth="2">
                    {showConfirmPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 hover:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden lg:block w-[45%] relative">
          <img
            src={frameImg}
            alt="Pattern"
            className="absolute top-4 left-4 max-w-[450px] w-full"
            loading="lazy"
          />
          <img
            src={signupImg}
            alt="Students"
            className="relative z-10 max-w-[450px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
