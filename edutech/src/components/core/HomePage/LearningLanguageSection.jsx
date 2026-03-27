import React from 'react';
import HighlightText from './HighlightText';
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png';
import CompareWithOthers from '../../../assets/Images/Compare_with_others.png';
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-32">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-4xl font-semibold text-center">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </h2>

        <p className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using our spin making learning multiple languages easy. with 20+ languages 
          realistic voice-over, progress tracking, custom schedule and more.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-5">
          <img
            src={KnowYourProgress}
            alt="Know Your Progress"
            className="object-contain lg:-mr-32"
          />
          <img
            src={CompareWithOthers}
            alt="Compare With Others"
            className="object-contain"
          />
          <img
            src={PlanYourLessons}
            alt="Plan Your Lessons"
            className="object-contain lg:-ml-36"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
