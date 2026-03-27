import React from 'react';
import InstructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';

const InstructorSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-20 items-center">
      {/* Left - Image */}
      <div className="w-full lg:w-[50%]">
        <img
          src={InstructorImage}
          alt="Instructor"
          className="shadow-[-20px_-20px_0_0_rgba(255,255,255,1)]"
        />
      </div>

      {/* Right - Text */}
      <div className="w-full lg:w-[50%] flex flex-col gap-10">
        <h2 className="text-4xl font-semibold w-[50%]">
          Become an
          <HighlightText text={"Instructor"} />
        </h2>
        <p className="font-medium text-[16px] w-[80%] text-richblack-300">
          Instructors from around the world teach millions of students on StudyNotion. 
          We provide the tools and skills to teach what you love.
        </p>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex items-center gap-2">
              Start Teaching Today
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12H19M12 5L19 12L12 19" />
              </svg>
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
