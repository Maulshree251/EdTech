import React from 'react';
import TimeLineImage from '../../../assets/Images/TimelineImage.png';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left - Timeline */}
        <div className="w-full lg:w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6" key={index}>
              <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-[0_0_62px_0_#0000001a]">
                <img src={element.Logo} alt={element.heading} />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-[18px]">{element.heading}</h3>
                <p className="text-base">{element.Description}</p>
              </div>

              {/* Connecting dashed line */}
              {index < timeline.length - 1 && (
                <div className="hidden lg:block absolute">
                  <div className="w-[1px] h-[42px] border-l border-dashed border-richblack-100 ml-[26px] mt-[52px]"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Image */}
        <div className="relative w-full lg:w-[55%] shadow-[0_0_30px_0_#47A5C5]">
          <img
            src={TimeLineImage}
            alt="Timeline"
            className="shadow-white object-cover h-fit rounded-md"
          />

          {/* Green stats bar */}
          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
            left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] lg:w-[80%]">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7 lg:px-14">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
            </div>
            <div className="flex flex-row gap-5 items-center px-7 lg:px-14">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
