import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo/Logo-Full-Light.png';
import { FooterLink2 } from '../../../data/Footer-Link';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = [
  "Paid memberships",
  "For students",
  "Business solutions",
];

const Community = [
  "Forums",
  "Chapters",
  "Events",
];

const Company = [
  "About",
  "Careers",
  "Affiliates",
];

const Footer = () => {
  return (
    <footer className="bg-richblack-800 border-t border-richblack-700">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        {/* Left Section */}
        <div className="border-b lg:border-b-0 lg:border-r border-richblack-700 w-full lg:w-[50%] flex flex-wrap flex-row justify-between pb-5 lg:pr-5 gap-3">
          {/* Column 1 - Logo + Company */}
          <div className="w-[30%] flex flex-col gap-3 mb-7 lg:mb-0 lg:pl-0">
            <img src={Logo} alt="StudyNotion" className="object-contain w-[160px]" />
            <h3 className="text-richblack-50 font-semibold text-[16px]">Company</h3>
            <div className="flex flex-col gap-2">
              {Company.map((item, index) => (
                <div
                  key={index}
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  <Link to={item.split(" ").join("-").toLowerCase()}>
                    {item}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex gap-3 text-lg">
              {/* Social icons */}
              <div className="w-8 h-8 rounded-full bg-richblack-700 flex items-center justify-center cursor-pointer hover:bg-richblack-600 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-richblack-700 flex items-center justify-center cursor-pointer hover:bg-richblack-600 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-richblack-700 flex items-center justify-center cursor-pointer hover:bg-richblack-600 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </div>
            </div>
          </div>

          {/* Column 2 - Resources */}
          <div className="w-[30%] flex flex-col gap-3 mb-7 lg:mb-0">
            <h3 className="text-richblack-50 font-semibold text-[16px]">Resources</h3>
            <div className="flex flex-col gap-2">
              {Resources.map((item, index) => (
                <div
                  key={index}
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  <Link to={item.split(" ").join("-").toLowerCase()}>
                    {item}
                  </Link>
                </div>
              ))}
            </div>
            <h3 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h3>
            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
              <Link to="/help-center">Help Center</Link>
            </div>
          </div>

          {/* Column 3 - Plans + Community */}
          <div className="w-[30%] flex flex-col gap-3 mb-7 lg:mb-0">
            <h3 className="text-richblack-50 font-semibold text-[16px]">Plans</h3>
            <div className="flex flex-col gap-2">
              {Plans.map((item, index) => (
                <div
                  key={index}
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  <Link to={item.split(" ").join("-").toLowerCase()}>
                    {item}
                  </Link>
                </div>
              ))}
            </div>
            <h3 className="text-richblack-50 font-semibold text-[16px] mt-7">Community</h3>
            <div className="flex flex-col gap-2">
              {Community.map((item, index) => (
                <div
                  key={index}
                  className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                >
                  <Link to={item.split(" ").join("-").toLowerCase()}>
                    {item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - from FooterLink2 data */}
        <div className="w-full lg:w-[50%] flex flex-wrap flex-row justify-between lg:pl-5 gap-3">
          {FooterLink2.map((section, index) => (
            <div key={index} className="w-[30%] flex flex-col gap-3 mb-7 lg:mb-0">
              <h3 className="text-richblack-50 font-semibold text-[16px]">{section.title}</h3>
              <div className="flex flex-col gap-2">
                {section.links
                  .filter((link) => link.title !== "-")
                  .map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={link.link}>{link.title}</Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((item, index) => (
              <div
                key={index}
                className={`${
                  BottomFooter.length - 1 === index
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3`}
              >
                <Link to={item.split(" ").join("-").toLowerCase()}>
                  {item}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            Made with ❤️ © 2024 StudyNotion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
