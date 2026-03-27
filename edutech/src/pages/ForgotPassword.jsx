import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/core/HomePage/Navbar';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await getPasswordResetToken(email, setEmailSent);
    setLoading(false);
  };

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? 'Reset your password' : 'Check email'}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-700 outline-none"
                />
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending...' : (!emailSent ? 'Reset Password' : 'Resend Email')}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
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

export default ForgotPassword;
