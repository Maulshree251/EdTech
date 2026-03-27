import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </h2>

      <p className="text-center text-richblack-300 text-sm mt-3">
        Learn to Build Anything You Can Imagine
      </p>

      {/* Tabs */}
      <div className="hidden lg:flex gap-5 mt-12 mx-auto w-max bg-richblack-800 rounded-full p-1 border-b border-richblack-600">
        {tabsName.map((tab, index) => (
          <div
            key={index}
            className={`text-[16px] flex items-center gap-2 rounded-full
              transition-all duration-200 cursor-pointer px-7 py-[7px]
              hover:bg-richblack-900 hover:text-richblack-5
              ${currentTab === tab
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
              }`}
            onClick={() => setMyCards(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div className="mt-10 flex flex-col lg:flex-row gap-10 justify-center w-full items-center lg:items-stretch">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
