import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
          transition-all duration-200 hover:scale-95
          ${active
            ? "bg-yellow-50 text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
            : "bg-richblack-800 text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
          }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
