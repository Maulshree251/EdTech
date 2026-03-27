import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/core/HomePage/Navbar';

const ResetComplete = () => {
  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white min-h-screen">
      <Navbar />
      <div className="h-14"></div>

      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Reset complete!
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            All done! Your password has been successfully reset.
          </p>

          <Link to="/login">
            <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200 cursor-pointer">
              Return to login
            </button>
          </Link>

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

export default ResetComplete;
