import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from '../components/core/HomePage/Navbar';
import loginImg from '../assets/Images/login.webp';
import frameImg from '../assets/Images/frame.png';
import { login } from '../services/operations/authAPI';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState('Student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login(formData.email, formData.password, navigate));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 w-11/12 max-w-maxContent mx-auto py-12 gap-12 justify-between items-center">
        {/* Left - Form */}
        <div className="w-full lg:w-[45%] max-w-[450px]">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Welcome Back
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

            {/* Password */}
            <label className="w-full relative">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Password <sup className="text-pink-200">*</sup>
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
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AFB2BF" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#AFB2BF" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
              <Link to="/forgot-password">
                <p className="text-xs mt-1 text-blue-100 text-right cursor-pointer hover:underline">
                  Forgot Password
                </p>
              </Link>
            </label>

            <button
              type="submit"
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 hover:scale-95 transition-all duration-200 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden lg:block w-[50%] relative">
          <img
            src={frameImg}
            alt="Pattern"
            className="absolute top-4 left-4 max-w-[450px] w-full"
            loading="lazy"
          />
          <img
            src={loginImg}
            alt="Students"
            className="relative z-10 max-w-[450px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
