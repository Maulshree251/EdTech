import React from 'react'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description: "Studynotion dictates its own terms. Today, being a competitive specialist requires more than professional skills.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description: "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description: "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description: "You will immediately get feedback during the learning process without having to wait for an answer or flaw.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
        {LearningGridArray.map((card, i) => {
            return (
                <div
                key={i}
                className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
                    card.order % 2 === 1
                    ? "bg-richblack-700 h-[294px]"
                    : card.order % 2 === 0
                    ? "bg-richblack-800 h-[294px]"
                    : "bg-transparent"
                } ${card.order === 3 && "xl:col-start-2"}  `}
                >
                {card.order < 0 ? (
                    <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                        <div className="text-4xl font-semibold text-richblack-5">
                            {card.heading}
                            <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                                {" "}{card.highlightText}
                            </span>
                        </div>
                        <p className="text-richblack-300 font-medium">
                            {card.description}
                        </p>
                        <div className="w-fit mt-2">
                            <button className="bg-yellow-50 text-black px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200">
                                {card.BtnText}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col gap-8">
                        <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                        <p className="text-richblack-300 font-medium">{card.description}</p>
                    </div>
                )}
                </div>
            );
        })}
    </div>
  )
}

export default LearningGrid
