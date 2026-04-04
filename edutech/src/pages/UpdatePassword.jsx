import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/core/HomePage/Navbar';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

    const hasMinLength = formData.password.length >= 8;
    const hasLower = /[a-z]/.test(formData.password);
    const hasUpper = /[A-Z]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isPasswordValid = hasMinLength && hasLower && hasUpper && hasNumber && hasSpecial;

    if (!isPasswordValid) {
      toast.error('Please fulfill all password requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    await resetPassword(formData.password, formData.confirmPassword, token, navigate);
    setLoading(false);
  };

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
            {/* New Password */}
            <label className="w-full relative">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter new password"
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

            {/* Confirm New Password */}
            <label className="w-full relative">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm new password"
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

            {/* Password Requirements */}
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                one lowercase character
              </div>
              <div className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                one special character
              </div>
              <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                one uppercase character
              </div>
              <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                8 character minimum
              </div>
              <div className={`flex items-center gap-1 ${/\d/.test(formData.password) ? 'text-caribbeangreen-300' : 'text-richblack-400'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17L4 12"/>
                </svg>
                one number
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5 cursor-pointer hover:text-richblack-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19L5 12L12 5" />
                </svg>
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
