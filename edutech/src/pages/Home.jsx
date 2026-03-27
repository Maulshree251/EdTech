import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Navbar from '../components/core/HomePage/Navbar';
import Footer from '../components/core/HomePage/Footer';
import CTAButton from '../components/core/HomePage/CTAButton';
import HighlightText from '../components/core/HomePage/HighlightText';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import ReviewCarousel from '../components/core/HomePage/ReviewCarousel';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';

// Assets
import Banner from '../assets/Images/banner.mp4';
import bghome from '../assets/Images/bghome.svg';

const HomePage = () => {
  // Data for the reviews section
  const reviewsData = [
    { name: 'Cody Fisher', text: 'The explanations are clear and the projects are exactly what I needed for my portfolio.', rating: 5 },
    { name: 'Esther Howard', text: 'StudyNotion transformed how I learn. The instructors are top-notch!', rating: 4.5 },
    { name: 'Eleanor Pena', text: 'A fantastic platform! The flexibility to learn at my own pace was a game changer.', rating: 5 },
    { name: 'Albert Flores', text: 'Highly recommend! I landed my first tech job after completing the full stack course.', rating: 5 },
    { name: 'Jenny Wilson', text: 'The community support is incredible. Always someone to help when you get stuck.', rating: 4.5 },
    { name: 'Robert Fox', text: 'Best investment in my career. The curriculum is always up-to-date with industry trends.', rating: 5 },
  ];

  return (
    <div className="flex flex-col font-inter bg-richblack-900 text-white w-full min-h-screen">

      {/* ================= NAVBAR ================= */}
      <Navbar />
      <div className="h-14"></div>

      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white">
        {/* Become Instructor pill */}
        <Link to="/signup">
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit hover:bg-richblack-900 border-b-[1px] border-richblack-700">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12H19M12 5L19 12L12 19" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Heading */}
        <h1 className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </h1>

        {/* Sub heading */}
        <p className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video Banner */}
        <div className="mx-3 my-12 w-[70%] max-w-[750px] shadow-[10px_-5px_50px_-5px_#118AB2]">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* ============= CODE BLOCK 1 ============= */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <h2 className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} />
                {" "}with our online courses.
              </h2>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M12 5L19 12L12 19" />
                </svg>
              ),
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={"bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]"}
          />
        </div>

        {/* ============= CODE BLOCK 2 ============= */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <h2 className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </h2>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M12 5L19 12L12 19" />
                </svg>
              ),
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimate from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-richblack-5"}
            backgroundGradient={"bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}
          />
        </div>
      </section>

      {/* ================= EXPLORE MORE SECTION ================= */}
      <div className="relative w-full border-b border-pure-greys-100">
        {/* White bottom half background */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[30%] lg:h-[45%] bg-pure-greys-5 z-0"
          style={{ backgroundImage: `url(${bghome})` }}
        ></div>
        
        <section className="relative z-10 mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-center text-white min-h-screen my-16">
          <div className="w-full">
          <ExploreMore />
        </div>

        {/* Buttons below the cards */}
        <div className="flex flex-row gap-7 mt-16 mb-10">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="flex items-center gap-3">
              Explore Full Catalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12H19M12 5L19 12L12 19" />
              </svg>
            </div>
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </section>
      </div>

      {/* ================= SECTION 2: WHITE BG ================= */}
      <div className="bg-pure-greys-5 text-richblack-700">

        {/* Get the skills section */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col lg:flex-row gap-5 mb-10 mt-[95px]">
            <h2 className="text-4xl font-semibold w-full lg:w-[45%]">
              Get the skills you need for a
              <HighlightText text={"job that is in demand."} />
            </h2>
            <div className="flex flex-col gap-10 w-full lg:w-[40%] items-start">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to be
                a competitive specialist requires more than professional skills.
              </p>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section */}
          <TimelineSection />

          {/* Learning Language Section */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* ================= SECTION 3: DARK BG ================= */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Instructor Section */}
        <div className="mt-16">
          <InstructorSection />
        </div>

        {/* Reviews Section */}
        <div className="w-full mt-20 mb-16">
          <h2 className="text-center text-4xl font-semibold mt-10">
            Reviews from other learners
          </h2>
          <div className="mt-12 px-6">
            <ReviewCarousel reviews={reviewsData} />
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default HomePage;