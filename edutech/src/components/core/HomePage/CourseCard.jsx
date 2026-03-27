import React from 'react';

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-[320px] lg:w-[28%] min-h-[300px] cursor-pointer transition-all duration-300 flex flex-col
        ${currentCard === cardData.heading
          ? "bg-white shadow-[12px_12px_0_0_#FFD60A]"
          : "bg-richblack-800"
        }`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed p-6 flex flex-col gap-3 flex-grow">
        <h3
          className={`text-xl font-semibold ${
            currentCard === cardData.heading ? "text-richblack-800" : "text-richblack-25"
          }`}
        >
          {cardData.heading}
        </h3>
        <p className={`${currentCard === cardData.heading ? "text-richblack-500" : "text-richblack-400"}`}>
          {cardData.description}
        </p>
      </div>

      <div
        className={`flex justify-between py-3 px-6
          ${currentCard === cardData.heading ? "text-blue-300" : "text-richblack-300"}`}
      >
        <div className="flex items-center gap-2 text-[16px]">
          {/* Level icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
            <path d="M2 17L12 22L22 17"/>
            <path d="M2 12L12 17L22 12"/>
          </svg>
          {cardData.level}
        </div>
        <div className="flex items-center gap-2 text-[16px]">
          {/* Lesson icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z"/>
            <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z"/>
          </svg>
          {cardData.lessionNumber} Lessons
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
