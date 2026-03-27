import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/core/HomePage/Navbar';
import { signUp, sendOTP } from '../services/operations/authAPI';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter the complete 6-digit OTP');
      return;
    }

    // Get stored signup data
    const signupData = JSON.parse(localStorage.getItem('signupData'));
    if (!signupData) {
      alert('Signup data not found. Please sign up again.');
      navigate('/signup');
      return;
    }

    setLoading(true);
    await signUp(signupData, otpValue, navigate);
    setLoading(false);
  };

  const handleResendOTP = async () => {
    const signupData = JSON.parse(localStorage.getItem('signupData'));
    if (!signupData) {
      alert('Signup data not found. Please sign up again.');
      navigate('/signup');
      return;
    }
    setLoading(true);
    await sendOTP(signupData.email);
    setLoading(false);
    alert('OTP resent successfully!');
  };

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Verify Email
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            A verification code has been sent to you. Enter the code below.
          </p>

          <form onSubmit={handleOnSubmit}>
            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 lg:gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-[48px] lg:w-[60px] h-[48px] lg:h-[60px] bg-richblack-800 border-b border-richblack-700 rounded-[0.5rem] text-richblack-5 text-center text-xl font-semibold outline-none focus:border-yellow-50 transition-all duration-200"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
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
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="flex items-center gap-x-2 text-blue-100 cursor-pointer hover:underline disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              Resend it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
